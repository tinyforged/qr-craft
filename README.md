<div align="center">

<a href="https://github.com/tinyforged/qr-craft" target="_blank">
  <img alt="QR-Craft Logo" width="200" height="200">
</a>

<h1 align="center">QR-Craft</h1>

<p align="center">🎨 高度可定制的二维码生成器</p>

<p align="center">
  <a href="https://github.com/tinyforged/qr-craft/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/tinyforged/qr-craft?style=social&label=Star" />
  </a>
  <a href="https://github.com/tinyforged/qr-craft/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/tinyforged/qr-craft?style=social&label=Issue" />
  </a>
  <a href="https://github.com/tinyforged/qr-craft/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/tinyforged/qr-craft?style=social&label=MIT" />
  </a>
</p>

---

## ✨ 功能特性

- 🎨 **丰富的样式选项** - 18种点阵图案、13种图眼样式
- 🌈 **灵活的颜色配置** - 前景色、背景色、图眼色独立设置
- 🖼️ **自定义 Logo** - 支持上传 Logo 并自动适配
- 📐 **边框设置** - 宽度、圆角、颜色可调
- 💾 **模板系统** - 内置多种精选模板，支持保存自定义配置
- 📥 **实时预览** - 配置即时渲染，所见即所得
- 🖼️ **高清导出** - 支持 PNG 格式导出

---

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:3300](http://localhost:3300) 查看效果。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

---

## 📦 项目结构

```
qr-craft/
├── src/
│   ├── app/              # Next.js 页面
│   ├── components/       # UI 组件
│   ├── core/             # 核心模块 (QR生成、Canvas渲染)
│   ├── design-system/   # 设计系统 (图案、图眼样式)
│   ├── templates/       # 模板预设
│   ├── types/            # TypeScript 类型定义
│   └── utils/            # 工具函数
├── public/              # 静态资源
│   └── images/          # 图案/图眼预览图
└── package.json
```

---

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS 4
- **UI**: Base UI
- **语言**: TypeScript 5
- **二维码**: qrcode + qrcode.react

---

## 📄 许可证

[MIT License](LICENSE)

---

## 🤝 致谢

- [qrcode](https://github.com/soldair/node-qrcode) - 二维码生成核心
- [Base UI](https://base-ui.com/) - 无样式 UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
