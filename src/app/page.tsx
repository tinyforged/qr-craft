"use client";

import { QRPreview } from "@/components/QRPreview";
import { PatternSelector } from "@/components/PatternSelector";
import { EyeStyleSelector } from "@/components/EyeStyleSelector";
import { ColorPicker } from "@/components/ColorPicker";
import { LogoUploader } from "@/components/LogoUploader";
import { BorderSettings } from "@/components/BorderSettings";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AdvancedSettings } from "@/components/AdvancedSettings";
import {
  useQRConfig,
  useQRGeneration,
  useTemplateManager,
  useLogoUpload,
} from "@/hooks";
import type {
  QRStyleConfig,
  PatternStyle,
  EyeStyle,
  BorderStyle,
  ColorScheme,
} from "@/types";

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

interface StylePanelProps {
  config: QRStyleConfig;
  selectedTemplateId: string;
  customTemplates: Array<{ id: string; name: string; config: QRStyleConfig }>;
  isGenerating: boolean;
  logoDataUrl: string;
  logoFileName?: string;
  onTemplateSelect: (id: string) => void;
  onSaveTemplate: () => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoClear: () => void;
  onPatternChange: (pattern: PatternStyle) => void;
  onEyeStyleChange: (eyeStyle: EyeStyle) => void;
  onForegroundChange: (foreground: ColorScheme) => void;
  onBackgroundChange: (background: ColorScheme) => void;
  onEyeColorChange: (color: string) => void;
  onMarginChange: (margin: number) => void;
  onErrorCorrectionLevelChange: (
    level: QRStyleConfig["errorCorrectionLevel"],
  ) => void;
  onVersionChange: (version: number) => void;
  onSizeChange: (size: number) => void;
  onBorderChange: (changes: Partial<BorderStyle>) => void;
}

function StylePanel({
  config,
  selectedTemplateId,
  customTemplates,
  isGenerating,
  logoDataUrl,
  logoFileName,
  onTemplateSelect,
  onSaveTemplate,
  onLogoUpload,
  onLogoClear,
  onPatternChange,
  onEyeStyleChange,
  onForegroundChange,
  onBackgroundChange,
  onEyeColorChange,
  onMarginChange,
  onErrorCorrectionLevelChange,
  onVersionChange,
  onSizeChange,
  onBorderChange,
}: StylePanelProps) {
  const setForegroundColor = (color: string) => {
    onForegroundChange({ mode: "solid", solid: color });
  };

  const setBackgroundColor = (color: string) => {
    onBackgroundChange({ mode: "solid", solid: color });
  };

  return (
    <div className="md:flex-1 md:overflow-auto border-b border-slate-200 bg-white md:border-b-0 md:border-r md:border-slate-200">
      <div className="px-5 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-800">二维码样式</div>
          <button
            onClick={onSaveTemplate}
            className="h-8 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-50"
            disabled={isGenerating}
          >
            保存样式
          </button>
        </div>
        <div className="mt-2">
          <TemplateSelector
            selectedId={selectedTemplateId}
            customTemplates={customTemplates}
            onSelect={onTemplateSelect}
          />
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-200">
        <LogoUploader
          logoDataUrl={logoDataUrl}
          logoFileName={logoFileName}
          onUpload={onLogoUpload}
          onClear={onLogoClear}
        />
      </div>

      <div className="px-5 py-3 border-b border-slate-200">
        <div className="text-sm font-semibold text-slate-800 mb-2">
          码点码眼
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              码点形状
            </label>
            <PatternSelector
              value={config.pattern}
              onChange={onPatternChange}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              码眼形状
            </label>
            <EyeStyleSelector
              value={config.eyeStyle}
              onChange={onEyeStyleChange}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">码颜色</label>
            <ColorPicker
              value={config.foreground.solid || "#000000"}
              onChange={setForegroundColor}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              码背景色
            </label>
            <ColorPicker
              value={config.background.solid || "#FFFFFF"}
              onChange={setBackgroundColor}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              码眼颜色
            </label>
            <ColorPicker
              value={config.eyeColor || "#000000"}
              onChange={onEyeColorChange}
            />
          </div>
        </div>
      </div>

      <AdvancedSettings
        margin={config.margin}
        errorCorrectionLevel={config.errorCorrectionLevel}
        version={config.version || 3}
        size={config.size}
        contentValue={config.value}
        onMarginChange={onMarginChange}
        onErrorCorrectionLevelChange={onErrorCorrectionLevelChange}
        onVersionChange={onVersionChange}
        onSizeChange={onSizeChange}
      />

      <BorderSettings
        width={config.border.width}
        color={config.border.color}
        radius={config.border.radius}
        onWidthChange={(width) => onBorderChange({ width })}
        onColorChange={(color) => onBorderChange({ color })}
        onRadiusChange={(radius) => onBorderChange({ radius })}
      />
    </div>
  );
}

export default function QRCodeGenerator() {
  const {
    config,
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
    updateConfig,
  } = useQRConfig(defaultConfig);

  const {
    selectedTemplateId,
    customTemplates,
    selectTemplate,
    saveCustomTemplate,
  } = useTemplateManager();

  const { logoDataUrl, logoFile, handleFileChange, clearLogo } =
    useLogoUpload();

  const { canvasRef, isGenerating, generate, download } = useQRGeneration({
    config,
    logoDataUrl,
    autoGenerate: true,
  });

  const handleTemplateSelect = (id: string) => {
    const templateConfig = selectTemplate(id);
    if (templateConfig) {
      applyTemplate(templateConfig);
    }
  };

  const handleSaveTemplate = () => {
    const name = prompt("请输入模板名称:");
    if (name) {
      saveCustomTemplate(name, config);
    }
  };

  const handleDownload = async () => {
    await download();
  };

  const handleContentChange = (value: string) => {
    updateConfig({ value });
  };

  const handleRegenerate = () => {
    generate();
  };

  return (
    <div className="h-dvh bg-white text-slate-900 overflow-hidden flex flex-col">
      <div className="h-14 px-4 md:px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="font-semibold text-slate-900">QR-Craft</div>
        <div className="text-xs text-slate-400">二维码生成器</div>
      </div>

      <div className="flex-1 min-h-0 md:flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        <StylePanel
          config={config}
          selectedTemplateId={selectedTemplateId}
          customTemplates={customTemplates}
          isGenerating={isGenerating}
          logoDataUrl={logoDataUrl}
          logoFileName={logoFile?.name}
          onTemplateSelect={handleTemplateSelect}
          onSaveTemplate={handleSaveTemplate}
          onLogoUpload={handleFileChange}
          onLogoClear={clearLogo}
          onPatternChange={setPattern}
          onEyeStyleChange={setEyeStyle}
          onForegroundChange={setForeground}
          onBackgroundChange={setBackground}
          onEyeColorChange={setEyeColor}
          onMarginChange={setMargin}
          onErrorCorrectionLevelChange={setErrorCorrectionLevel}
          onVersionChange={setVersion}
          onSizeChange={setSize}
          onBorderChange={setBorder}
        />

        <QRPreview
          ref={canvasRef}
          isGenerating={isGenerating}
          onDownload={handleDownload}
          onRegenerate={handleRegenerate}
          contentValue={config.value}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  );
}
