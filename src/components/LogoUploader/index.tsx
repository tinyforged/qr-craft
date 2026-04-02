"use client";

import { useRef } from "react";

interface LogoUploaderProps {
  logoDataUrl: string;
  logoFileName?: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isUploading?: boolean;
}

export function LogoUploader({
  logoDataUrl,
  logoFileName,
  onUpload,
  onClear,
  isUploading = false,
}: LogoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="text-sm font-semibold text-slate-800">Logo</div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isUploading}
          className="h-9 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm disabled:opacity-50 transition-colors"
        >
          {isUploading ? "上传中..." : "上传Logo"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={onClear}
          disabled={!logoDataUrl || isUploading}
          className="h-9 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm disabled:opacity-50 transition-colors"
        >
          清除
        </button>
      </div>
      {logoDataUrl && (
        <div className="mt-3 flex items-center gap-3">
          <img
            src={logoDataUrl}
            alt="Logo"
            className="w-10 h-10 rounded-md border border-slate-200 object-cover"
          />
          <div className="text-sm text-slate-600 truncate flex-1">
            {logoFileName || "已上传"}
          </div>
        </div>
      )}
    </div>
  );
}
