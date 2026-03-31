import type { EyeStyle } from '../types'

export interface EyeInfo {
  id: EyeStyle
  name: string
  description: string
  preview: string
}

export const eyes: EyeInfo[] = [
  {
    id: 'standard',
    name: '方正',
    description: '经典方形图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" fill="currentColor"/>
      <rect x="25" y="25" width="50" height="50" fill="white"/>
      <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'rounded',
    name: '圆角',
    description: '柔和圆角图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="15" fill="currentColor"/>
      <rect x="25" y="25" width="50" height="50" rx="10" fill="white"/>
      <rect x="40" y="40" width="20" height="20" rx="5" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'thick-rounded',
    name: '粗圆角',
    description: '粗边框圆角图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="90" height="90" rx="20" fill="currentColor"/>
      <rect x="30" y="30" width="40" height="40" rx="10" fill="white"/>
      <rect x="42" y="42" width="16" height="16" rx="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'medium-rounded',
    name: '中圆角',
    description: '中等圆角图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="84" height="84" rx="18" fill="currentColor"/>
      <rect x="26" y="26" width="48" height="48" rx="12" fill="white"/>
      <rect x="41" y="41" width="18" height="18" rx="6" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'thin-rounded',
    name: '细圆角',
    description: '细边框圆角图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="76" height="76" rx="12" fill="currentColor"/>
      <rect x="24" y="24" width="52" height="52" rx="8" fill="white"/>
      <rect x="39" y="39" width="22" height="22" rx="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'thick-circle',
    name: '粗圆形',
    description: '粗边框圆形图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="currentColor"/>
      <circle cx="50" cy="50" r="25" fill="white"/>
      <circle cx="50" cy="50" r="10" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'thin-circle',
    name: '细圆形',
    description: '细边框圆形图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="currentColor"/>
      <circle cx="50" cy="50" r="28" fill="white"/>
      <circle cx="50" cy="50" r="12" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'diamond',
    name: '菱形',
    description: '独特菱形图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 95,50 50,95 5,50" fill="currentColor"/>
      <polygon points="50,25 75,50 50,75 25,50" fill="white"/>
      <polygon points="50,40 60,50 50,60 40,50" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'star',
    name: '星形',
    description: '星形图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 61,35 95,35 68,55 79,85 50,65 21,85 32,55 5,35 39,35" fill="currentColor"/>
      <circle cx="50" cy="50" r="15" fill="white"/>
      <circle cx="50" cy="50" r="7" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'bubble',
    name: '气泡',
    description: '气泡风格图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="45" ry="35" fill="currentColor"/>
      <ellipse cx="50" cy="50" rx="25" ry="18" fill="white"/>
      <ellipse cx="50" cy="50" r="10" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'eye',
    name: '眼睛',
    description: '眼睛形状图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50,10 C20,10 5,50 5,50 C5,50 20,90 50,90 C80,90 95,50 95,50 C95,50 80,10 50,10" fill="currentColor"/>
      <ellipse cx="50" cy="50" rx="20" ry="15" fill="white"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'single-rounded',
    name: '单圆角',
    description: '单边圆角图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,10 L90,10 L90,90 Q50,90 10,90 Z" fill="currentColor"/>
      <rect x="25" y="25" width="50" height="50" rx="5" fill="white"/>
      <rect x="40" y="40" width="20" height="20" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'four-eye',
    name: '四码眼',
    description: '四分图眼',
    preview: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="35" height="35" fill="currentColor"/>
      <rect x="55" y="10" width="35" height="35" fill="currentColor"/>
      <rect x="10" y="55" width="35" height="35" fill="currentColor"/>
      <rect x="55" y="55" width="35" height="35" fill="currentColor"/>
      <rect x="22" y="22" width="11" height="11" fill="white"/>
      <rect x="67" y="22" width="11" height="11" fill="white"/>
      <rect x="22" y="67" width="11" height="11" fill="white"/>
      <rect x="67" y="67" width="11" height="11" fill="white"/>
    </svg>`
  }
]

export function getEyeById(id: EyeStyle): EyeInfo | undefined {
  return eyes.find(e => e.id === id)
}
