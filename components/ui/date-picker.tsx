"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
  className?: string;
  align?: "start" | "center" | "end";
  withTime?: boolean;
  timeLabel?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder = "Pick a date",
  disabled,
  disablePastDates = false,
  disableFutureDates = false,
  className,
  align = "start",
  withTime = false,
  timeLabel = "Time",
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(
    date ? format(date, "HH:mm") : "12:00"
  );

  const getDisabledDates = React.useCallback(
    (date: Date) => {
      if (disabled) {
        return disabled(date);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (disablePastDates && date < today) {
        return true;
      }

      if (disableFutureDates && date > today) {
        return true;
      }

      return false;
    },
    [disabled, disablePastDates, disableFutureDates]
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && withTime) {
      // Combine date with time
      const [hours, minutes] = time.split(":");
      selectedDate.setHours(parseInt(hours), parseInt(minutes));
      onSelect?.(selectedDate);
    } else {
      onSelect?.(selectedDate);
      if (!withTime) {
        setOpen(false);
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (date) {
      const newDate = new Date(date);
      const [hours, minutes] = newTime.split(":");
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onSelect?.(newDate);
    }
  };

  // Update time when date prop changes
  React.useEffect(() => {
    if (date) {
      setTime(format(date, "HH:mm"));
    }
  }, [date]);

  if (withTime) {
    return (
      <div className="flex gap-2">
        <div className="flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between font-normal",
                  !date && "text-muted-foreground",
                  className
                )}
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align={align}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  handleDateSelect(selectedDate);
                  setOpen(false);
                }}
                disabled={getDisabledDates}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-32">
          <Input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={getDisabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
