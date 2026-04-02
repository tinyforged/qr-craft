import { useState, useCallback } from "react";
import type { QRStyleConfig, PatternStyle, EyeStyle, BorderStyle, ColorScheme } from "@/types";

const defaultConfig: QRStyleConfig = {
  value: "https://example.com",
  size: 300,
  errorCorrectionLevel: "H",
  version: 3,
  pattern: "normal",
  eyeStyle: "standard",
  foreground: {
    mode: "solid",
    solid: "#000000",
  },
  background: {
    mode: "solid",
    solid: "#FFFFFF",
  },
  eyeColor: "#000000",
  border: {
    width: 0,
    color: "#000000",
    radius: 0,
  },
  margin: 2,
  labelSize: 0,
};

export function useQRConfig(initialConfig?: Partial<QRStyleConfig>) {
  const [config, setConfig] = useState<QRStyleConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const updateConfig = useCallback((updates: Partial<QRStyleConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const setValue = useCallback((value: string) => {
    setConfig((prev) => ({ ...prev, value }));
  }, []);

  const setPattern = useCallback((pattern: PatternStyle) => {
    setConfig((prev) => ({ ...prev, pattern }));
  }, []);

  const setEyeStyle = useCallback((eyeStyle: EyeStyle) => {
    setConfig((prev) => ({ ...prev, eyeStyle }));
  }, []);

  const setForeground = useCallback((foreground: ColorScheme) => {
    setConfig((prev) => ({ ...prev, foreground }));
  }, []);

  const setBackground = useCallback((background: ColorScheme) => {
    setConfig((prev) => ({ ...prev, background }));
  }, []);

  const setEyeColor = useCallback((eyeColor: string) => {
    setConfig((prev) => ({ ...prev, eyeColor }));
  }, []);

  const setBorder = useCallback((border: Partial<BorderStyle>) => {
    setConfig((prev) => ({
      ...prev,
      border: { ...prev.border, ...border },
    }));
  }, []);

  const setMargin = useCallback((margin: number) => {
    setConfig((prev) => ({ ...prev, margin }));
  }, []);

  const setErrorCorrectionLevel = useCallback(
    (errorCorrectionLevel: QRStyleConfig["errorCorrectionLevel"]) => {
      setConfig((prev) => ({ ...prev, errorCorrectionLevel }));
    },
    []
  );

  const setVersion = useCallback((version: number) => {
    setConfig((prev) => ({ ...prev, version }));
  }, []);

  const setSize = useCallback((size: number) => {
    setConfig((prev) => ({ ...prev, size }));
  }, []);

  const applyTemplate = useCallback((templateConfig: QRStyleConfig) => {
    setConfig(templateConfig);
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    setValue,
    setPattern,
    setEyeStyle,
    setForeground,
    setBackground,
    setEyeColor,
    setBorder,
    setMargin,
    setErrorCorrectionLevel,
    setVersion,
    setSize,
    applyTemplate,
    resetConfig,
  };
}
