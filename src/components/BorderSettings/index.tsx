"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ColorPicker";

interface BorderSettingsProps {
  width: number;
  color: string;
  radius: number;
  onWidthChange: (width: number) => void;
  onColorChange: (color: string) => void;
  onRadiusChange: (radius: number) => void;
}

export function BorderSettings({
  width,
  color,
  radius,
  onWidthChange,
  onColorChange,
  onRadiusChange,
}: BorderSettingsProps) {
  return (
    <div className="px-5 py-3">
      <div className="text-sm font-semibold text-slate-800 mb-2">
        边框设置
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            边框宽度
          </label>
          <Select value={String(width)} onValueChange={(v) => onWidthChange(Number(v))}>
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 21 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            边框圆角
          </label>
          <Select value={String(radius)} onValueChange={(v) => onRadiusChange(Number(v))}>
            <SelectTrigger className="w-full h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 21 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            边框颜色
          </label>
          <ColorPicker value={color} onChange={onColorChange} />
        </div>
      </div>
    </div>
  );
}
