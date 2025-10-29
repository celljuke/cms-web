"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VList } from "virtua";
import { useAvailableUsers } from "../hooks";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { AssignedUser } from "../types";

interface RecruiterSelectProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function RecruiterSelect({ value, onChange }: RecruiterSelectProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);
  const { data: users, isLoading } = useAvailableUsers();

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!debouncedSearch.trim()) return users;

    const query = debouncedSearch.toLowerCase();
    return users.filter(
      (user: AssignedUser) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, debouncedSearch]);

  const selectedRecruiter = useMemo(
    () => users?.find((u: AssignedUser) => u.id === value),
    [users, value]
  );

  const handleSelect = (userId: number) => {
    onChange(userId);
    setOpen(false);
    setSearch("");
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="space-y-3">
      {selectedRecruiter ? (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {selectedRecruiter.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{selectedRecruiter.name}</div>
            <div className="text-sm text-muted-foreground truncate">
              {selectedRecruiter.email}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search recruiters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[320px] overflow-hidden"
            align="start"
            sideOffset={4}
          >
            {isLoading ? (
              <div className="p-2 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredUsers && filteredUsers.length > 0 ? (
              <div className="overflow-auto" style={{ height: "300px" }}>
                <VList style={{ height: "100%" }}>
                  {filteredUsers.map((user: AssignedUser) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSelect(user.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors text-left"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{user.name}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </VList>
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No recruiters found
              </div>
            )}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
