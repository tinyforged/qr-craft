import type { QRMatrix } from "./QRGenerator";
import type { QRStyleConfig, ColorScheme, BorderStyle } from "../types";
import {
  bodyShapes,
  eyeballShapes,
  eyeframeShapes,
  eyeStyleMap,
  type GetNeighbor,
} from "./shapes";

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  /**
   * 渲染QR码到Canvas
   */
  async render(matrix: QRMatrix, config: QRStyleConfig): Promise<void> {
    const { size, data } = matrix;
    const moduleSize = Math.floor(config.size / (size + config.margin * 2));
    const actualSize = moduleSize * (size + config.margin * 2);

    // 设置画布大小
    this.canvas.width = actualSize + config.border.width * 2;
    this.canvas.height = actualSize + config.border.width * 2;

    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 绘制背景
    await this.drawBackground(config.background, config.border);

    // 绘制QR码主体
    const offsetX = config.border.width + config.margin * moduleSize;
    const offsetY = config.border.width + config.margin * moduleSize;

    await this.drawQRCode(data, size, moduleSize, offsetX, offsetY, config);

    // 绘制Logo
    if (config.logo && config.logo.src) {
      await this.drawLogo(config.logo, actualSize, config.border.width);
    }

    // 绘制边框
    if (config.border.width > 0) {
      this.drawBorder(config.border, actualSize);
    }
  }

  /**
   * 绘制背景
   */
  private async drawBackground(
    background: ColorScheme,
    border: BorderStyle,
  ): Promise<void> {
    const width = this.canvas.width;
    const height = this.canvas.height;

    if (background.mode === "transparent") {
      // 透明背景
      this.ctx.clearRect(0, 0, width, height);
    } else if (background.mode === "solid") {
      // 纯色背景
      this.ctx.fillStyle = background.solid || "#FFFFFF";
      this.ctx.fillRect(0, 0, width, height);
    } else if (background.mode === "gradient" && background.gradient) {
      // 渐变背景
      const gradient = this.createGradient(background.gradient, width, height);
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, width, height);
    }
  }

  /**
   * 检查位置是否在图眼区域内
   */
  private isEyeArea(row: number, col: number, size: number): boolean {
    const eyeSize = 7;
    const eyeInnerSize = 3;

    const isInEye = (
      startRow: number,
      startCol: number,
    ): { isEye: boolean; isInner: boolean; isOuter: boolean } => {
      const endRow = startRow + eyeSize;
      const endCol = startCol + eyeSize;
      const innerStartRow = startRow + 2;
      const innerStartCol = startCol + 2;
      const innerEndRow = startRow + eyeSize - 2;
      const innerEndCol = startCol + eyeSize - 2;

      if (row >= startRow && row < endRow && col >= startCol && col < endCol) {
        const isInner =
          row >= innerStartRow &&
          row < innerEndRow &&
          col >= innerStartCol &&
          col < innerEndCol;
        const isOuter =
          row === startRow ||
          row === endRow - 1 ||
          col === startCol ||
          col === endCol - 1 ||
          (row >= innerStartRow &&
            row < innerEndRow &&
            col >= innerStartCol &&
            col < innerEndCol);
        return { isEye: true, isInner, isOuter };
      }
      return { isEye: false, isInner: false, isOuter: false };
    };

    const topLeft = isInEye(0, 0);
    const topRight = isInEye(0, size - eyeSize);
    const bottomLeft = isInEye(size - eyeSize, 0);

    return topLeft.isEye || topRight.isEye || bottomLeft.isEye;
  }

  /**
   * 绘制图眼
   */
  private drawEye(
    x: number,
    y: number,
    moduleSize: number,
    eyeStyle: string,
    eyeColor: string,
  ): void {
    this.ctx.save();

    const styleConfig = eyeStyleMap[eyeStyle] || eyeStyleMap["standard"];
    const framePath =
      eyeframeShapes[styleConfig.frame] || eyeframeShapes["square"];
    const ballPath = eyeballShapes[styleConfig.ball] || eyeballShapes["square"];

    const framePath2D = new Path2D();
    framePath2D.addPath(
      new Path2D(framePath),
      new DOMMatrix().translateSelf(x, y).scaleSelf(moduleSize, moduleSize),
    );

    this.ctx.fillStyle = eyeColor || "#000000";
    this.ctx.fill(framePath2D, "evenodd");

    const ballPath2D = new Path2D();
    ballPath2D.addPath(
      new Path2D(ballPath),
      new DOMMatrix().translateSelf(x, y).scaleSelf(moduleSize, moduleSize),
    );

    this.ctx.fillStyle = eyeColor || "#000000";
    this.ctx.fill(ballPath2D);

    this.ctx.restore();
  }

  /**
   * 绘制QR码主体
   */
  private async drawQRCode(
    data: boolean[][],
    size: number,
    moduleSize: number,
    offsetX: number,
    offsetY: number,
    config: QRStyleConfig,
  ): Promise<void> {
    const eyeSize = 7;

    const getNeighbor: GetNeighbor = (rowOffset: number, colOffset: number) => {
      const checkRow = Math.floor(rowOffset);
      const checkCol = Math.floor(colOffset);
      if (
        checkRow < 0 ||
        checkRow >= size ||
        checkCol < 0 ||
        checkCol >= size
      ) {
        return false;
      }
      return data[checkRow][checkCol];
    };

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (data[row][col]) {
          const x = offsetX + col * moduleSize;
          const y = offsetY + row * moduleSize;

          const isEye = this.isEyeArea(row, col, size);

          if (!isEye) {
            const currentGetNeighbor: GetNeighbor = (
              rowOffset: number,
              colOffset: number,
            ) => {
              const checkRow = row + Math.floor(rowOffset);
              const checkCol = col + Math.floor(colOffset);
              if (
                checkRow < 0 ||
                checkRow >= size ||
                checkCol < 0 ||
                checkCol >= size
              ) {
                return false;
              }
              return data[checkRow][checkCol];
            };

            await this.drawModule(
              x,
              y,
              moduleSize,
              config.pattern,
              config.foreground,
              currentGetNeighbor,
            );
          }
        }
      }
    }

    this.drawEye(
      offsetX,
      offsetY,
      moduleSize,
      config.eyeStyle,
      config.eyeColor || config.foreground.solid || "#000000",
    );
    this.drawEye(
      offsetX + (size - eyeSize) * moduleSize,
      offsetY,
      moduleSize,
      config.eyeStyle,
      config.eyeColor || config.foreground.solid || "#000000",
    );
    this.drawEye(
      offsetX,
      offsetY + (size - eyeSize) * moduleSize,
      moduleSize,
      config.eyeStyle,
      config.eyeColor || config.foreground.solid || "#000000",
    );
  }

  /**
   * 绘制单个模块
   */
  private async drawModule(
    x: number,
    y: number,
    size: number,
    pattern: string,
    color: ColorScheme,
    getNeighbor?: GetNeighbor,
  ): Promise<void> {
    this.ctx.save();

    if (color.mode === "gradient" && color.gradient) {
      this.ctx.fillStyle = this.createGradient(
        color.gradient,
        size,
        size,
        x,
        y,
      );
    } else {
      this.ctx.fillStyle = color.solid || "#000000";
    }

    const shapeFn = bodyShapes[pattern] || bodyShapes["normal"];
    const pathStr = shapeFn(x / size, y / size, getNeighbor);

    const path = new Path2D();
    path.addPath(new Path2D(pathStr), new DOMMatrix().scale(size, size));

    this.ctx.fill(path);
    this.ctx.restore();
  }

  /**
   * 绘制圆角矩形
   */
  private drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height,
    );
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /**
   * 创建渐变
   */
  private createGradient(
    gradientConfig: NonNullable<ColorScheme["gradient"]>,
    width: number,
    height: number,
    offsetX: number = 0,
    offsetY: number = 0,
  ): CanvasGradient {
    let gradient: CanvasGradient;

    if (gradientConfig.type === "linear") {
      const angle = ((gradientConfig.angle || 0) * Math.PI) / 180;
      const x1 = offsetX;
      const y1 = offsetY;
      const x2 = offsetX + width * Math.cos(angle);
      const y2 = offsetY + height * Math.sin(angle);
      gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      gradient = this.ctx.createRadialGradient(
        offsetX + width / 2,
        offsetY + height / 2,
        0,
        offsetX + width / 2,
        offsetY + height / 2,
        Math.max(width, height) / 2,
      );
    }

    gradientConfig.colors.forEach(({ color, offset }) => {
      gradient.addColorStop(offset / 100, color);
    });

    return gradient;
  }

  /**
   * 绘制Logo
   */
  private async drawLogo(
    logo: NonNullable<QRStyleConfig["logo"]>,
    qrSize: number,
    borderWidth: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!logo.src) {
        resolve();
        return;
      }

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const logoSize = qrSize * (logo.size / 100);
        const margin = logo.margin;
        const totalSize = logoSize + margin * 2;
        const x = (this.canvas.width - totalSize) / 2;
        const y = (this.canvas.height - totalSize) / 2;

        // 绘制Logo背景（如果需要挖掘）
        if (logo.excavate) {
          this.ctx.save();
          this.ctx.fillStyle = "#FFFFFF";

          if (logo.shape === "circle") {
            this.ctx.beginPath();
            this.ctx.arc(
              x + totalSize / 2,
              y + totalSize / 2,
              totalSize / 2,
              0,
              Math.PI * 2,
            );
            this.ctx.fill();
          } else {
            const radius = logo.shape === "rounded" ? 10 : 0;
            this.drawRoundedRect(x, y, totalSize, totalSize, radius);
          }

          this.ctx.restore();
        }

        // 绘制Logo
        this.ctx.save();
        this.ctx.beginPath();

        if (logo.shape === "circle") {
          this.ctx.arc(
            x + totalSize / 2,
            y + totalSize / 2,
            logoSize / 2,
            0,
            Math.PI * 2,
          );
          this.ctx.clip();
        } else if (logo.shape === "rounded") {
          const radius = 10;
          this.ctx.moveTo(x + margin + radius, y + margin);
          this.ctx.lineTo(x + margin + logoSize - radius, y + margin);
          this.ctx.quadraticCurveTo(
            x + margin + logoSize,
            y + margin,
            x + margin + logoSize,
            y + margin + radius,
          );
          this.ctx.lineTo(
            x + margin + logoSize,
            y + margin + logoSize - radius,
          );
          this.ctx.quadraticCurveTo(
            x + margin + logoSize,
            y + margin + logoSize,
            x + margin + logoSize - radius,
            y + margin + logoSize,
          );
          this.ctx.lineTo(x + margin + radius, y + margin + logoSize);
          this.ctx.quadraticCurveTo(
            x + margin,
            y + margin + logoSize,
            x + margin,
            y + margin + logoSize - radius,
          );
          this.ctx.lineTo(x + margin, y + margin + radius);
          this.ctx.quadraticCurveTo(
            x + margin,
            y + margin,
            x + margin + radius,
            y + margin,
          );
          this.ctx.closePath();
          this.ctx.clip();
        }

        this.ctx.drawImage(img, x + margin, y + margin, logoSize, logoSize);
        this.ctx.restore();

        resolve();
      };

      img.onerror = () => {
        reject(new Error("Failed to load logo image"));
      };

      img.src = logo.src!;
    });
  }

  /**
   * 绘制边框
   */
  private drawBorder(border: BorderStyle, qrSize: number): void {
    if (border.width <= 0) return;

    this.ctx.save();

    // 边框阴影
    if (border.shadow) {
      this.ctx.shadowColor = border.shadow.color;
      this.ctx.shadowBlur = border.shadow.blur;
      this.ctx.shadowOffsetX = border.shadow.x;
      this.ctx.shadowOffsetY = border.shadow.y;
    }

    // 绘制边框背景（填充）
    this.ctx.fillStyle = border.color;

    if (border.radius > 0) {
      // 圆角边框
      this.drawRoundedRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height,
        border.radius,
      );
    } else {
      // 直角边框
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.ctx.restore();
  }

  /**
   * 导出为Blob
   */
  toBlob(
    format: string = "image/png",
    quality: number = 1,
  ): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => resolve(blob), format, quality);
    });
  }

  /**
   * 导出为Data URL
   */
  toDataURL(format: string = "image/png", quality: number = 1): string {
    return this.canvas.toDataURL(format, quality);
  }
}
