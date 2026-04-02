import { useState, useCallback, useEffect } from "react";
import type { QRStyleConfig, QRTemplate } from "@/types";
import { presetTemplates } from "@/templates/presets";

const STORAGE_KEY = "qr-craft-custom-templates";

export interface CustomTemplate {
  id: string;
  name: string;
  config: QRStyleConfig;
  createdAt: number;
}

interface UseTemplateManagerReturn {
  selectedTemplateId: string;
  customTemplates: CustomTemplate[];
  allTemplates: Array<QRTemplate | CustomTemplate>;
  selectTemplate: (id: string) => QRStyleConfig | null;
  saveCustomTemplate: (name: string, config: QRStyleConfig) => CustomTemplate;
  deleteCustomTemplate: (id: string) => void;
  renameCustomTemplate: (id: string, newName: string) => void;
  exportTemplates: () => string;
  importTemplates: (json: string) => boolean;
  isPreset: (id: string) => boolean;
  getTemplateById: (id: string) => QRTemplate | CustomTemplate | undefined;
}

export function useTemplateManager(): UseTemplateManagerReturn {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomTemplates(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load custom templates:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
    } catch (err) {
      console.error("Failed to save custom templates:", err);
    }
  }, [customTemplates]);

  const allTemplates = [...presetTemplates, ...customTemplates];

  const isPreset = useCallback((id: string) => {
    return presetTemplates.some((t) => t.id === id);
  }, []);

  const getTemplateById = useCallback(
    (id: string): QRTemplate | CustomTemplate | undefined => {
      return allTemplates.find((t) => t.id === id);
    },
    [allTemplates]
  );

  const selectTemplate = useCallback(
    (id: string): QRStyleConfig | null => {
      setSelectedTemplateId(id);

      if (!id) return null;

      const preset = presetTemplates.find((t) => t.id === id);
      if (preset) return preset.config;

      const custom = customTemplates.find((t) => t.id === id);
      if (custom) return custom.config;

      return null;
    },
    [customTemplates]
  );

  const saveCustomTemplate = useCallback(
    (name: string, config: QRStyleConfig): CustomTemplate => {
      const newTemplate: CustomTemplate = {
        id: `custom-${Date.now()}`,
        name,
        config,
        createdAt: Date.now(),
      };

      setCustomTemplates((prev) => [...prev, newTemplate]);
      setSelectedTemplateId(newTemplate.id);

      return newTemplate;
    },
    []
  );

  const deleteCustomTemplate = useCallback((id: string) => {
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id));
    if (selectedTemplateId === id) {
      setSelectedTemplateId("");
    }
  }, [selectedTemplateId]);

  const renameCustomTemplate = useCallback((id: string, newName: string) => {
    setCustomTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: newName } : t))
    );
  }, []);

  const exportTemplates = useCallback((): string => {
    return JSON.stringify(customTemplates, null, 2);
  }, [customTemplates]);

  const importTemplates = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) return false;

      const validTemplates = parsed.filter(
        (t) =>
          t.id &&
          t.name &&
          t.config &&
          typeof t.id === "string" &&
          typeof t.name === "string"
      );

      if (validTemplates.length === 0) return false;

      setCustomTemplates((prev) => {
        const existingIds = new Set(prev.map((t) => t.id));
        const newTemplates = validTemplates.filter(
          (t) => !existingIds.has(t.id)
        );
        return [...prev, ...newTemplates];
      });

      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    selectedTemplateId,
    customTemplates,
    allTemplates,
    selectTemplate,
    saveCustomTemplate,
    deleteCustomTemplate,
    renameCustomTemplate,
    exportTemplates,
    importTemplates,
    isPreset,
    getTemplateById,
  };
}
