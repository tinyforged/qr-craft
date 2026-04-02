import { useState, useCallback } from "react";

interface UseLogoUploadReturn {
  logoFile: File | null;
  logoDataUrl: string;
  isUploading: boolean;
  error: string | null;
  handleUpload: (file: File) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearLogo: () => void;
}

export function useLogoUpload(): UseLogoUploadReturn {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setLogoFile(file);
        setLogoDataUrl(result);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError("Failed to read file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
      e.target.value = "";
    },
    [handleUpload]
  );

  const clearLogo = useCallback(() => {
    setLogoFile(null);
    setLogoDataUrl("");
    setError(null);
  }, []);

  return {
    logoFile,
    logoDataUrl,
    isUploading,
    error,
    handleUpload,
    handleFileChange,
    clearLogo,
  };
}
