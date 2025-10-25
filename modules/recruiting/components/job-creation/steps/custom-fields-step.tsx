"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useJobCreationStore } from "../../../stores/job-creation-store";
import { useEffect } from "react";

interface CustomFieldsStepProps {
  onValidationChange: (isValid: boolean) => void;
}

interface CustomField {
  id: string;
  value: string;
}

export function CustomFieldsStep({
  onValidationChange,
}: CustomFieldsStepProps) {
  const { formData, updateFormData } = useJobCreationStore();
  const [customFields, setCustomFields] = useState<CustomField[]>(
    formData.custom_fields || []
  );
  const [newFieldId, setNewFieldId] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  useEffect(() => {
    // Always valid since custom fields are optional
    onValidationChange(true);
  }, [onValidationChange]);

  useEffect(() => {
    // Update store when custom fields change
    updateFormData({ custom_fields: customFields });
  }, [customFields, updateFormData]);

  const addCustomField = () => {
    if (newFieldId.trim() && newFieldValue.trim()) {
      setCustomFields([
        ...customFields,
        { id: newFieldId.trim(), value: newFieldValue.trim() },
      ]);
      setNewFieldId("");
      setNewFieldValue("");
    }
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomField();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-none">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Custom Fields</h3>
            <p className="text-sm text-muted-foreground">
              Add Custom Field (ID can be any value)
            </p>
          </div>

          {/* Add Custom Field Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="field-id">Field ID</Label>
                <Input
                  id="field-id"
                  placeholder="Enter field ID (any value)"
                  value={newFieldId}
                  onChange={(e) => setNewFieldId(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field-value">Value</Label>
                <Input
                  id="field-value"
                  placeholder="Enter field value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addCustomField}
              disabled={!newFieldId.trim() || !newFieldValue.trim()}
              className="w-full md:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Field
            </Button>
          </div>

          {/* Custom Fields List */}
          {customFields.length > 0 ? (
            <div className="space-y-3">
              <div className="text-sm font-medium">Added Custom Fields</div>
              <div className="space-y-2">
                {customFields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Field ID
                        </div>
                        <div className="text-sm font-medium">{field.id}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Value
                        </div>
                        <div className="text-sm">{field.value}</div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCustomField(index)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-muted-foreground border rounded-lg bg-muted/20">
              No custom fields added yet. Add custom fields using the form
              above.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
