"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { presetTemplates } from "@/templates/presets";
import type { CustomTemplate } from "@/hooks/useTemplateManager";

interface TemplateSelectorProps {
  selectedId: string;
  customTemplates: CustomTemplate[];
  onSelect: (id: string) => void;
}

export function TemplateSelector({
  selectedId,
  customTemplates,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">模板</label>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder="基本样式" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">基本样式</SelectItem>
          {presetTemplates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
          {customTemplates.length > 0 && (
            <>
              {customTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
