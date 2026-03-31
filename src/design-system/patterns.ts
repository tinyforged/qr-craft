import type { PatternStyle } from "../types";

export interface PatternInfo {
  id: PatternStyle;
  name: string;
  description: string;
  preview: string;
}

export const patterns: PatternInfo[] = [
  {
    id: "normal",
    name: "普通",
    description: "经典方形图案",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "liquid",
    name: "液化",
    description: "流体液化风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" rx="6" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" rx="6" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "round-liquid",
    name: "圆液化",
    description: "柔和圆液化风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" rx="8" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" rx="8" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "stripe",
    name: "条纹",
    description: "横条纹风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "constant-stripe",
    name: "恒条纹",
    description: "恒定条纹风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "vertical-stripe",
    name: "竖条纹",
    description: "竖直条纹风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "tile",
    name: "瓷砖",
    description: "瓷砖拼贴风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "big-dot",
    name: "大圆点",
    description: "大圆点风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="10" fill="currentColor"/>
      <circle cx="50" cy="20" r="10" fill="currentColor"/>
      <circle cx="80" cy="20" r="10" fill="currentColor"/>
      <circle cx="20" cy="50" r="10" fill="currentColor"/>
      <circle cx="80" cy="50" r="10" fill="currentColor"/>
      <circle cx="20" cy="80" r="10" fill="currentColor"/>
      <circle cx="50" cy="80" r="10" fill="currentColor"/>
      <circle cx="80" cy="80" r="10" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "small-dot",
    name: "小圆点",
    description: "小圆点精致风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="6" fill="currentColor"/>
      <circle cx="50" cy="20" r="6" fill="currentColor"/>
      <circle cx="80" cy="20" r="6" fill="currentColor"/>
      <circle cx="20" cy="50" r="6" fill="currentColor"/>
      <circle cx="80" cy="50" r="6" fill="currentColor"/>
      <circle cx="20" cy="80" r="6" fill="currentColor"/>
      <circle cx="50" cy="80" r="6" fill="currentColor"/>
      <circle cx="80" cy="80" r="6" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "thick-star",
    name: "粗星形",
    description: "粗线条星形风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,8 23,17 32,17 25,23 28,32 20,26 12,32 15,23 8,17 17,17" fill="currentColor"/>
      <polygon points="50,8 53,17 62,17 55,23 58,32 50,26 42,32 45,23 38,17 47,17" fill="currentColor"/>
      <polygon points="80,8 83,17 92,17 85,23 88,32 80,26 72,32 75,23 68,17 77,17" fill="currentColor"/>
      <polygon points="20,38 23,47 32,47 25,53 28,62 20,56 12,62 15,53 8,47 17,47" fill="currentColor"/>
      <polygon points="80,38 83,47 92,47 85,53 88,62 80,56 72,62 75,53 68,47 77,47" fill="currentColor"/>
      <polygon points="20,68 23,77 32,77 25,83 28,92 20,86 12,92 15,83 8,77 17,77" fill="currentColor"/>
      <polygon points="50,68 53,77 62,77 55,83 58,92 50,86 42,92 45,83 38,77 47,77" fill="currentColor"/>
      <polygon points="80,68 83,77 92,77 85,83 88,92 80,86 72,92 75,83 68,77 77,77" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "thin-star",
    name: "细星形",
    description: "细线条星形风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,8 22,16 30,16 24,21 26,29 20,24 14,29 16,21 10,16 18,16" fill="currentColor"/>
      <polygon points="50,8 52,16 60,16 54,21 56,29 50,24 44,29 46,21 40,16 48,16" fill="currentColor"/>
      <polygon points="80,8 82,16 90,16 84,21 86,29 80,24 74,29 76,21 70,16 78,16" fill="currentColor"/>
      <polygon points="20,38 22,46 30,46 24,51 26,59 20,54 14,59 16,51 10,46 18,46" fill="currentColor"/>
      <polygon points="80,38 82,46 90,46 84,51 86,59 80,54 74,59 76,51 70,46 78,46" fill="currentColor"/>
      <polygon points="20,68 22,76 30,76 24,81 26,89 20,84 14,89 16,81 10,76 18,76" fill="currentColor"/>
      <polygon points="50,68 52,76 60,76 54,81 56,89 50,84 44,89 46,81 40,76 48,76" fill="currentColor"/>
      <polygon points="80,68 82,76 90,76 84,81 86,89 80,84 74,89 76,81 70,76 78,76" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "grid",
    name: "网格",
    description: "网格线条风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="40" width="20" height="20" fill="currentColor"/>
      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="40" y="70" width="20" height="20" fill="currentColor"/>
      <rect x="70" y="70" width="20" height="20" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "diamond",
    name: "菱形",
    description: "菱形独特风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,5 35,20 20,35 5,20" fill="currentColor"/>
      <polygon points="50,5 65,20 50,35 35,20" fill="currentColor"/>
      <polygon points="80,5 95,20 80,35 65,20" fill="currentColor"/>
      <polygon points="20,35 35,50 20,65 5,50" fill="currentColor"/>
      <polygon points="80,35 95,50 80,65 65,50" fill="currentColor"/>
      <polygon points="20,65 35,80 20,95 5,80" fill="currentColor"/>
      <polygon points="50,65 65,80 50,95 35,80" fill="currentColor"/>
      <polygon points="80,65 95,80 80,95 65,80" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "small-square",
    name: "小方点",
    description: "小方点精致风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="16" height="16" fill="currentColor"/>
      <rect x="42" y="12" width="16" height="16" fill="currentColor"/>
      <rect x="72" y="12" width="16" height="16" fill="currentColor"/>
      <rect x="12" y="42" width="16" height="16" fill="currentColor"/>
      <rect x="72" y="42" width="16" height="16" fill="currentColor"/>
      <rect x="12" y="72" width="16" height="16" fill="currentColor"/>
      <rect x="42" y="72" width="16" height="16" fill="currentColor"/>
      <rect x="72" y="72" width="16" height="16" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "triangle",
    name: "三角形",
    description: "三角形独特风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,35 30,15 40,35" fill="currentColor"/>
      <polygon points="50,35 60,15 70,35" fill="currentColor"/>
      <polygon points="80,35 90,15 100,35" fill="currentColor"/>
      <polygon points="20,65 30,45 40,65" fill="currentColor"/>
      <polygon points="80,65 90,45 100,65" fill="currentColor"/>
      <polygon points="20,95 30,75 40,95" fill="currentColor"/>
      <polygon points="50,95 60,75 70,95" fill="currentColor"/>
      <polygon points="80,95 90,75 100,95" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "heart",
    name: "心形",
    description: "心形浪漫风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,28 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M50,28 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M80,28 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M20,58 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M80,58 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M20,88 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M50,88 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
      <path d="M80,88 c-2,-10 12,-10 10,0 l-5,8 l-5,-8 c-2,-12 14,-8 10,0" fill="currentColor"/>
    </svg>`,
  },
  {
    id: "leaf",
    name: "叶子",
    description: "叶子自然风格",
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,20 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M45,20 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M75,20 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M15,50 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M75,50 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M15,80 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M45,80 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
      <path d="M75,80 h6 a5,5 0 0,1 5,5 v6 h-6 a5,5 0 0,1 -5,-5 v-6 z" fill="currentColor"/>
    </svg>`,
  },
];

export function getPatternById(id: PatternStyle): PatternInfo | undefined {
  return patterns.find((p) => p.id === id);
}
