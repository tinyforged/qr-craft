"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  showInput?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  label,
  showInput = true,
}: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleInputChange = (newValue: string) => {
    setLocalValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handlePickerChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const displayValue = localValue || value || "#000000";

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="h-10 w-12 rounded-lg border border-input bg-transparent p-1 cursor-pointer overflow-hidden"
            />
          }
        >
          <div
            className="w-full h-full rounded"
            style={{ backgroundColor: displayValue }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <HexColorPicker
            color={displayValue}
            onChange={handlePickerChange}
            style={{ width: 200, height: 150 }}
          />
        </PopoverContent>
      </Popover>
      {showInput && (
        <input
          value={displayValue}
          onChange={(e) => handleInputChange(e.target.value)}
          className="h-10 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder={label || "#000000"}
        />
      )}
    </div>
  );
}
