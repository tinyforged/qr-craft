// 核心类型定义

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

// 图案类型
export type PatternStyle =
  | "normal"
  | "liquid"
  | "round-liquid"
  | "stripe"
  | "constant-stripe"
  | "vertical-stripe"
  | "tile"
  | "big-dot"
  | "small-dot"
  | "thick-star"
  | "thin-star"
  | "grid"
  | "diamond"
  | "small-square"
  | "triangle"
  | "heart"
  | "leaf";

// 图眼样式
export type EyeStyle =
  | "standard"
  | "rounded"
  | "thick-rounded"
  | "medium-rounded"
  | "thin-rounded"
  | "thick-circle"
  | "thin-circle"
  | "diamond"
  | "star"
  | "bubble"
  | "eye"
  | "single-rounded"
  | "four-eye";

// 颜色类型
export type ColorMode = "solid" | "gradient" | "transparent";

export interface GradientColor {
  type: "linear" | "radial";
  angle?: number;
  colors: Array<{
    color: string;
    offset: number;
  }>;
}

export interface ColorScheme {
  mode: ColorMode;
  solid?: string;
  gradient?: GradientColor;
  transparency?: number;
}

// 边框样式
export interface BorderStyle {
  width: number;
  color: string;
  radius: number;
  shadow?: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
  decoration?: "none" | "dots" | "dashes";
}

// Logo设置
export interface LogoSettings {
  src: string | null;
  size: number; // 百分比
  margin: number;
  shape: "square" | "circle" | "rounded";
  excavate: boolean; // 是否挖掘背景
}

// QR码样式配置
export interface QRStyleConfig {
  // 基础设置
  value: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  version?: number;

  // 设计系统
  pattern: PatternStyle;
  eyeStyle: EyeStyle;

  // 颜色
  foreground: ColorScheme;
  background: ColorScheme;
  eyeColor: string;

  // 边框
  border: BorderStyle;

  // Logo
  logo?: LogoSettings;

  // 高级
  margin: number;
  labelSize?: number;
}

// 模板
export interface QRTemplate {
  id: string;
  name: string;
  category: "tech" | "cute" | "business" | "minimal" | "artistic";
  preview: string;
  config: QRStyleConfig;
  tags: string[];
  popularity: number;
}

// 导出选项
export type ExportFormat = "png" | "jpg" | "svg" | "pdf";

export interface ExportOptions {
  format: ExportFormat;
  quality: number; // 1-100
  dpi: number; // 用于打印
  includeBackground: boolean;
  metadata?: {
    title?: string;
    author?: string;
    description?: string;
  };
}

// 导出结果
export interface ExportResult {
  success: boolean;
  data?: Blob | string;
  filename: string;
  error?: string;
}
