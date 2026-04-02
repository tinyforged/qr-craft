"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { PatternStyle } from "@/types";

interface PatternOption {
  value: PatternStyle;
  label: string;
  image: number;
}

const patternOptions: PatternOption[] = [
  { value: "normal", label: "普通", image: 1 },
  { value: "liquid", label: "液化", image: 2 },
  { value: "round-liquid", label: "圆液化", image: 3 },
  { value: "stripe", label: "条纹", image: 4 },
  { value: "constant-stripe", label: "恒条纹", image: 5 },
  { value: "vertical-stripe", label: "竖条纹", image: 6 },
  { value: "tile", label: "瓷砖", image: 7 },
  { value: "big-dot", label: "大圆点", image: 8 },
  { value: "small-dot", label: "小圆点", image: 9 },
  { value: "thick-star", label: "粗星形", image: 10 },
  { value: "thin-star", label: "细星形", image: 11 },
  { value: "grid", label: "网格", image: 12 },
  { value: "diamond", label: "菱形", image: 13 },
  { value: "small-square", label: "小方点", image: 14 },
];

interface PatternSelectorProps {
  value: PatternStyle;
  onChange: (pattern: PatternStyle) => void;
}

export function PatternSelector({ value, onChange }: PatternSelectorProps) {
  const selected = patternOptions.find((opt) => opt.value === value);

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
              src={`/images/dot/${selected.image}.png`}
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
          {patternOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors hover:bg-accent ${
                value === option.value ? "bg-accent ring-2 ring-ring" : ""
              }`}
            >
              <img
                src={`/images/dot/${option.image}.png`}
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
