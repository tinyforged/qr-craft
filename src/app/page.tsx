"use client";

import { useState, useRef, useEffect } from "react";
import { QRGenerator } from "@/core/QRGenerator";
import { CanvasRenderer } from "@/core/CanvasRenderer";
import { presetTemplates } from "@/templates/presets";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { QRStyleConfig, PatternStyle, EyeStyle } from "@/types";

export default function QRCodeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<QRStyleConfig>({
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
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customTemplates, setCustomTemplates] = useState<
    Array<{ id: string; name: string; config: QRStyleConfig }>
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const patternOptions: {
    value: PatternStyle;
    label: string;
    image: number;
  }[] = [
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

  const eyeStyleOptions: { value: EyeStyle; label: string; image: number }[] = [
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

  useEffect(() => {
    generateQRCode();
  }, [config, logoDataUrl]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      const matrix = await QRGenerator.generateMatrix(
        config.value,
        config.errorCorrectionLevel,
      );
      const renderer = new CanvasRenderer(canvasRef.current);

      const configWithLogo = logoDataUrl
        ? {
            ...config,
            logo: {
              src: logoDataUrl,
              size: 20,
              margin: 4,
              shape: "rounded" as const,
              excavate: true,
            },
          }
        : config;

      await renderer.render(matrix, configWithLogo);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    try {
      const renderer = new CanvasRenderer(canvasRef.current);
      const blob = await renderer.toBlob("image/png", 1);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qrcode-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleTemplateApply = (templateId: string) => {
    const template = presetTemplates.find((t) => t.id === templateId);
    if (template) return setConfig(template.config);

    const custom = customTemplates.find((t) => t.id === templateId);
    if (custom) return setConfig(custom.config);
  };

  const handleSaveTemplate = () => {
    const name = prompt("请输入模板名称:");
    if (name) {
      const id = `custom-${Date.now()}`;
      setCustomTemplates((prev) => [...prev, { id, name, config }]);
      setSelectedTemplate(id);
      alert("模板已保存!");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setLogoFile(null);
    setLogoDataUrl("");
  };

  const setForegroundColor = (color: string) => {
    setConfig((prev) => ({
      ...prev,
      foreground: { ...prev.foreground, mode: "solid", solid: color },
    }));
  };

  const setBackgroundColor = (color: string) => {
    setConfig((prev) => ({
      ...prev,
      background: { ...prev.background, mode: "solid", solid: color },
    }));
  };

  const setEyeColor = (color: string) => {
    setConfig((prev) => ({ ...prev, eyeColor: color }));
  };

  return (
    <div className="h-screen bg-white text-slate-900 overflow-hidden flex flex-col">
      <div className="h-14 px-6 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
        <div className="font-semibold">二维码样式编辑器</div>
        <div className="text-sm text-slate-500">静态二维码生成</div>
      </div>

      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 border-r border-slate-200 bg-white overflow-auto">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-slate-800">
                二维码样式
              </div>
              <button
                onClick={handleSaveTemplate}
                className="h-8 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-50"
                disabled={isGenerating}
              >
                保存样式
              </button>
            </div>

            <div className="mt-3">
              <label className="block text-sm text-slate-600 mb-1">模板</label>
              <Select
                value={selectedTemplate}
                onValueChange={(id) => {
                  setSelectedTemplate(id);
                  if (id) handleTemplateApply(id);
                }}
              >
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
          </div>

          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-semibold text-slate-800">Logo</div>
            <div className="mt-3 flex items-center gap-3">
              <label className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm cursor-pointer">
                上传Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={clearLogo}
                disabled={!logoDataUrl}
                className="h-9 px-3 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm disabled:opacity-50"
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
                  {logoFile?.name || "已上传"}
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-semibold text-slate-800 mb-3">
              码点码眼
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  码点形状
                </label>
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="w-full h-10 flex items-center gap-2 px-3 rounded-lg border border-input bg-transparent text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-slate-50"
                      />
                    }
                  >
                    {(() => {
                      const selected = patternOptions.find(
                        (opt) => opt.value === config.pattern,
                      );
                      return selected ? (
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
                      );
                    })()}
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
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              pattern: option.value,
                            }))
                          }
                          className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors hover:bg-accent ${
                            config.pattern === option.value
                              ? "bg-accent ring-2 ring-ring"
                              : ""
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
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  码眼形状
                </label>
                <Popover>
                  <PopoverTrigger
                    render={
                      <button
                        type="button"
                        className="w-full h-10 flex items-center gap-2 px-3 rounded-lg border border-input bg-transparent text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-slate-50"
                      />
                    }
                  >
                    {(() => {
                      const selected = eyeStyleOptions.find(
                        (opt) => opt.value === config.eyeStyle,
                      );
                      return selected ? (
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
                      );
                    })()}
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
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              eyeStyle: option.value,
                            }))
                          }
                          className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors hover:bg-accent ${
                            config.eyeStyle === option.value
                              ? "bg-accent ring-2 ring-ring"
                              : ""
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
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  码颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.foreground.solid || "#000000"}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="h-10 w-12 rounded-lg border border-input bg-transparent p-1 cursor-pointer"
                  />
                  <input
                    value={config.foreground.solid || "#000000"}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  码背景色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.background.solid || "#FFFFFF"}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 w-12 rounded-lg border border-input bg-transparent p-1 cursor-pointer"
                  />
                  <input
                    value={config.background.solid || "#FFFFFF"}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-slate-600 mb-1">
                  码眼颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.eyeColor || "#000000"}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="h-10 w-12 rounded-lg border border-input bg-transparent p-1 cursor-pointer"
                  />
                  <input
                    value={config.eyeColor || "#000000"}
                    onChange={(e) => setEyeColor(e.target.value)}
                    className="h-10 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 border-b border-slate-200">
            <div className="text-sm font-semibold text-slate-800">更多</div>
            <div className="mt-3 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    码边距
                  </label>
                  <Select
                    value={String(config.margin)}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        margin: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <SelectItem key={i} value={String(i)}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    容错率
                  </label>
                  <Select
                    value={config.errorCorrectionLevel}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        errorCorrectionLevel: value as "L" | "M" | "Q" | "H",
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">L (7%)</SelectItem>
                      <SelectItem value="M">M (15%)</SelectItem>
                      <SelectItem value="Q">Q (25%)</SelectItem>
                      <SelectItem value="H">H (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    码版本
                  </label>
                  <Select
                    value={String(config.version || 3)}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        version: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 40 }).map((_, i) => {
                        const version = i + 1;
                        const modules = 21 + (version - 1) * 4;
                        const isDisabled = version <= 2;
                        return (
                          <SelectItem
                            key={version}
                            value={String(version)}
                            disabled={isDisabled}
                            title={
                              isDisabled
                                ? "生码内容过多，请选择版本3(29×29)及以上版本"
                                : undefined
                            }
                          >
                            {version} ({modules}×{modules})
                            {isDisabled ? " - 容量不足" : ""}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    标签尺寸
                  </label>
                  <Select
                    value={String(config.size)}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        size: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[200, 240, 256, 288, 300, 320, 384, 448, 512].map(
                        (s) => (
                          <SelectItem key={s} value={String(s)}>
                            {s}px
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="text-sm font-semibold text-slate-800 mb-3">
              边框设置
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  边框宽度
                </label>
                <Select
                  value={String(config.border.width)}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      border: {
                        ...prev.border,
                        width: parseInt(value),
                      },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10">
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
                <Select
                  value={String(config.border.radius)}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      border: {
                        ...prev.border,
                        radius: parseInt(value),
                      },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10">
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
              <div className="col-span-2">
                <label className="block text-sm text-slate-600 mb-1">
                  边框颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.border.color}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        border: { ...prev.border, color: e.target.value },
                      }))
                    }
                    className="h-10 w-12 rounded-lg border border-input bg-transparent p-1 cursor-pointer"
                  />
                  <input
                    value={config.border.color}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        border: { ...prev.border, color: e.target.value },
                      }))
                    }
                    className="h-10 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-slate-50 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="text-sm font-semibold text-slate-800">预览</div>
          </div>
          <div className="flex-1 flex items-center justify-center p-6">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full shadow-lg rounded-lg"
            />
          </div>
          <div className="p-4 border-t border-slate-200 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 h-10 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-50"
              >
                {isGenerating ? "生成中..." : "保存为图片"}
              </button>
              <button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="h-10 px-4 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-sm disabled:opacity-50"
              >
                重新生成
              </button>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                编码内容
              </label>
              <input
                value={config.value}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, value: e.target.value }))
                }
                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                placeholder="输入文本或链接..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
