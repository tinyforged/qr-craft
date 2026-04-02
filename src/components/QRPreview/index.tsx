"use client";

import { forwardRef } from "react";

interface QRPreviewProps {
  isGenerating?: boolean;
  onDownload?: () => void;
  onRegenerate?: () => void;
  contentValue: string;
  onContentChange: (value: string) => void;
}

export const QRPreview = forwardRef<HTMLCanvasElement, QRPreviewProps>(
  (
    {
      isGenerating = false,
      onDownload,
      onRegenerate,
      contentValue,
      onContentChange,
    },
    ref,
  ) => {
    return (
      <div className="md:w-[360px] md:flex-shrink-0 bg-slate-50 flex flex-col md:min-h-0 min-h-[50vh]">
        <div className="px-5 py-3 border-b border-slate-200">
          <div className="text-sm font-semibold text-slate-800">预览</div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 md:p-6">
          <canvas
            ref={ref}
            className="max-w-full max-h-full shadow-lg rounded-lg"
          />
        </div>
        <div className="px-5 py-3 border-t border-slate-200 space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              编码内容
            </label>
            <input
              value={contentValue}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
              placeholder="输入文本或链接..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onDownload}
              disabled={isGenerating}
              className="flex-1 h-10 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-50 transition-colors"
            >
              {isGenerating ? "生成中..." : "保存为图片"}
            </button>
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="h-10 px-4 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm disabled:opacity-50 transition-colors"
            >
              重新生成
            </button>
          </div>
        </div>
      </div>
    );
  },
);

QRPreview.displayName = "QRPreview";
