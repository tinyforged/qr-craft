import type { QRTemplate } from "../types";

export const presetTemplates: QRTemplate[] = [
  {
    id: "tech-blue",
    name: "科技蓝",
    category: "tech",
    preview: "/templates/tech-blue.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "H",
      pattern: "round-liquid",
      eyeStyle: "rounded",
      foreground: {
        mode: "gradient",
        gradient: {
          type: "linear",
          angle: 135,
          colors: [
            { color: "#667EEA", offset: 0 },
            { color: "#764BA2", offset: 100 },
          ],
        },
      },
      background: {
        mode: "solid",
        solid: "#FFFFFF",
      },
      border: {
        width: 0,
        color: "#667EEA",
        radius: 0,
      },
      margin: 2,
      eyeColor: "#764BA2",
    },
    tags: ["科技", "现代", "渐变"],
    popularity: 95,
  },
  {
    id: "cute-pink",
    name: "可爱粉",
    category: "cute",
    preview: "/templates/cute-pink.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "H",
      pattern: "small-dot",
      eyeStyle: "thick-circle",
      foreground: {
        mode: "solid",
        solid: "#FF6B9D",
      },
      background: {
        mode: "solid",
        solid: "#FFF0F5",
      },
      border: {
        width: 16,
        color: "#FF6B9D",
        radius: 20,
        shadow: {
          x: 0,
          y: 4,
          blur: 12,
          color: "rgba(255, 107, 157, 0.3)",
        },
      },
      margin: 2,
      eyeColor: "#FF6B9D",
    },
    tags: ["可爱", "粉色", "圆点"],
    popularity: 88,
  },
  {
    id: "business-dark",
    name: "商务黑",
    category: "business",
    preview: "/templates/business-dark.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "M",
      pattern: "normal",
      eyeStyle: "standard",
      foreground: {
        mode: "solid",
        solid: "#1F2937",
      },
      background: {
        mode: "solid",
        solid: "#FFFFFF",
      },
      border: {
        width: 12,
        color: "#1F2937",
        radius: 8,
      },
      margin: 2,
      eyeColor: "#1F2937",
    },
    tags: ["商务", "简约", "专业"],
    popularity: 92,
  },
  {
    id: "minimal-white",
    name: "极简白",
    category: "minimal",
    preview: "/templates/minimal-white.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "M",
      pattern: "normal",
      eyeStyle: "rounded",
      foreground: {
        mode: "solid",
        solid: "#000000",
      },
      background: {
        mode: "solid",
        solid: "#FFFFFF",
      },
      border: {
        width: 0,
        color: "#000000",
        radius: 0,
      },
      margin: 1,
      eyeColor: "#000000",
    },
    tags: ["极简", "黑白", "优雅"],
    popularity: 85,
  },
  {
    id: "artistic-rainbow",
    name: "艺术彩虹",
    category: "artistic",
    preview: "/templates/artistic-rainbow.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "H",
      pattern: "liquid",
      eyeStyle: "bubble",
      foreground: {
        mode: "gradient",
        gradient: {
          type: "linear",
          angle: 45,
          colors: [
            { color: "#FF6B6B", offset: 0 },
            { color: "#4ECDC4", offset: 50 },
            { color: "#45B7D1", offset: 100 },
          ],
        },
      },
      background: {
        mode: "solid",
        solid: "#FFFFFF",
      },
      border: {
        width: 20,
        color: "#FF6B6B",
        radius: 24,
      },
      margin: 2,
      eyeColor: "#45B7D1",
    },
    tags: ["艺术", "彩虹", "创意"],
    popularity: 90,
  },
  {
    id: "nature-green",
    name: "自然绿",
    category: "minimal",
    preview: "/templates/nature-green.png",
    config: {
      value: "https://example.com",
      size: 300,
      errorCorrectionLevel: "H",
      pattern: "liquid",
      eyeStyle: "rounded",
      foreground: {
        mode: "solid",
        solid: "#10B981",
      },
      background: {
        mode: "solid",
        solid: "#F0FDF4",
      },
      border: {
        width: 12,
        color: "#10B981",
        radius: 16,
      },
      margin: 2,
      eyeColor: "#10B981",
    },
    tags: ["自然", "绿色", "清新"],
    popularity: 87,
  },
];

export function getTemplatesByCategory(
  category: QRTemplate["category"],
): QRTemplate[] {
  return presetTemplates.filter((t) => t.category === category);
}

export function getPopularTemplates(limit: number = 5): QRTemplate[] {
  return [...presetTemplates]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function searchTemplates(query: string): QRTemplate[] {
  const lowerQuery = query.toLowerCase();
  return presetTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
