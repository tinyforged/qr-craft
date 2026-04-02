import { useState, useRef, useCallback, useEffect } from "react";
import { QRGenerator } from "@/core/QRGenerator";
import { CanvasRenderer } from "@/core/CanvasRenderer";
import type { QRStyleConfig, LogoSettings } from "@/types";

interface UseQRGenerationOptions {
  config: QRStyleConfig;
  logoDataUrl?: string;
  logoSettings?: Partial<LogoSettings>;
  autoGenerate?: boolean;
}

interface UseQRGenerationReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isGenerating: boolean;
  error: string | null;
  generate: () => Promise<boolean>;
  download: (filename?: string) => Promise<boolean>;
  toBlob: () => Promise<Blob | null>;
  toDataURL: (format?: string, quality?: number) => string | null;
}

export function useQRGeneration({
  config,
  logoDataUrl,
  logoSettings,
  autoGenerate = true,
}: UseQRGenerationOptions): UseQRGenerationReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!canvasRef.current) {
      setError("Canvas not ready");
      return false;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const matrix = await QRGenerator.generateMatrix(
        config.value,
        config.errorCorrectionLevel,
        config.version
      );
      const renderer = new CanvasRenderer(canvasRef.current);

      const defaultLogoSettings: LogoSettings = {
        src: null,
        size: 20,
        margin: 4,
        shape: "rounded",
        excavate: true,
      };

      const finalLogoSettings: LogoSettings | undefined = logoDataUrl
        ? {
            ...defaultLogoSettings,
            src: logoDataUrl,
            ...logoSettings,
          }
        : undefined;

      const configWithLogo = finalLogoSettings
        ? { ...config, logo: finalLogoSettings }
        : config;

      await renderer.render(matrix, configWithLogo);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate QR code";
      setError(errorMessage);
      console.error("Failed to generate QR code:", err);
      return false;
    } finally {
      setIsGenerating(false);
    }
  }, [config, logoDataUrl, logoSettings]);

  const download = useCallback(
    async (filename?: string) => {
      if (!canvasRef.current) return false;

      try {
        const renderer = new CanvasRenderer(canvasRef.current);
        const blob = await renderer.toBlob("image/png", 1);
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename || `qrcode-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
          return true;
        }
        return false;
      } catch (err) {
        console.error("Download failed:", err);
        setError("Download failed");
        return false;
      }
    },
    []
  );

  const toBlob = useCallback(async (): Promise<Blob | null> => {
    if (!canvasRef.current) return null;

    try {
      const renderer = new CanvasRenderer(canvasRef.current);
      return await renderer.toBlob("image/png", 1);
    } catch (err) {
      console.error("toBlob failed:", err);
      return null;
    }
  }, []);

  const toDataURL = useCallback(
    (format: string = "image/png", quality: number = 1): string | null => {
      if (!canvasRef.current) return null;
      return canvasRef.current.toDataURL(format, quality);
    },
    []
  );

  useEffect(() => {
    if (autoGenerate) {
      generate();
    }
  }, [config, logoDataUrl, autoGenerate, generate]);

  return {
    canvasRef,
    isGenerating,
    error,
    generate,
    download,
    toBlob,
    toDataURL,
  };
}
