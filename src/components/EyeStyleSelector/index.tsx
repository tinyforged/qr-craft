"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { EyeStyle } from "@/types";

interface EyeStyleOption {
  value: EyeStyle;
  label: string;
  image: number;
}

const eyeStyleOptions: EyeStyleOption[] = [
  { value: "standard", label: "方正", image: 1 },
  { value: "rounded", label: "圆角", image: 2 },
  { value: "thick-rounded", label: "粗圆角", image: 3 },
  { value: "medium-rounded", label: "中圆角", image: 4 },
  { value: "thin-rounded", label: "细圆角", image: 5 },
  { value: "thick-circle", label: "粗圆形", image: 6 },
  { value: "thin-circle", label: "细圆形", image: 7 },
  { value: "diamond", label: "菱形", image: 8 },
  { value: "star", label: "星形", image: 9 },
  { value: "bubble", label: "气泡", image: 10 },
  { value: "eye", label: "眼睛", image: 11 },
  { value: "single-rounded", label: "单圆角", image: 12 },
  { value: "four-eye", label: "四码眼", image: 13 },
];

interface EyeStyleSelectorProps {
  value: EyeStyle;
  onChange: (eyeStyle: EyeStyle) => void;
}

export function EyeStyleSelector({ value, onChange }: EyeStyleSelectorProps) {
  const selected = eyeStyleOptions.find((opt) => opt.value === value);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="w-full h-10 flex items-center gap-2 px-3 rounded-lg border border-input bg-transparent text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-slate-50"
          />
        }
      >
        {selected ? (
          <>
            <img
              src={`/images/eye/${selected.image}.png`}
              alt={selected.label}
              width={20}
              height={20}
              className="shrink-0"
            />
            <span className="flex-1 text-left truncate">
              {selected.label}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">请选择</span>
        )}
        <svg
          className="w-4 h-4 text-muted-foreground ml-auto shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <div className="grid grid-cols-5 gap-2">
          {eyeStyleOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors hover:bg-accent ${
                value === option.value ? "bg-accent ring-2 ring-ring" : ""
              }`}
            >
              <img
                src={`/images/eye/${option.image}.png`}
                alt={option.label}
                width={32}
                height={32}
                className="shrink-0"
              />
              <span className="text-xs text-slate-600 truncate w-full text-center">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
