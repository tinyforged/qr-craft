import type { ExportFormat, ExportOptions, ExportResult } from '../types'

export class ExportManager {
  /**
   * 导出Canvas为图片
   */
  static async exportFromCanvas(
    canvas: HTMLCanvasElement,
    options: ExportOptions
  ): Promise<ExportResult> {
    try {
      const filename = this.generateFilename(options.format)

      switch (options.format) {
        case 'png':
          return await this.exportPNG(canvas, filename, options)
        
        case 'jpg':
          return await this.exportJPG(canvas, filename, options)
        
        case 'svg':
          return await this.exportSVG(canvas, filename, options)
        
        case 'pdf':
          return await this.exportPDF(canvas, filename, options)
        
        default:
          throw new Error(`Unsupported format: ${options.format}`)
      }
    } catch (error) {
      return {
        success: false,
        filename: '',
        error: error instanceof Error ? error.message : 'Export failed'
      }
    }
  }

  /**
   * 导出PNG
   */
  private static async exportPNG(
    canvas: HTMLCanvasElement,
    filename: string,
    options: ExportOptions
  ): Promise<ExportResult> {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({
              success: true,
              data: blob,
              filename: `${filename}.png`
            })
          } else {
            resolve({
              success: false,
              filename: '',
              error: 'Failed to create PNG blob'
            })
          }
        },
        'image/png',
        options.quality / 100
      )
    })
  }

  /**
   * 导出JPG
   */
  private static async exportJPG(
    canvas: HTMLCanvasElement,
    filename: string,
    options: ExportOptions
  ): Promise<ExportResult> {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({
              success: true,
              data: blob,
              filename: `${filename}.jpg`
            })
          } else {
            resolve({
              success: false,
              filename: '',
              error: 'Failed to create JPG blob'
            })
          }
        },
        'image/jpeg',
        options.quality / 100
      )
    })
  }

  /**
   * 导出SVG (矢量图)
   */
  private static async exportSVG(
    canvas: HTMLCanvasElement,
    filename: string,
    options: ExportOptions
  ): Promise<ExportResult> {
    try {
      // 将Canvas转换为SVG
      const dataUrl = canvas.toDataURL('image/png')
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${canvas.width}" 
     height="${canvas.height}"
     viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image width="${canvas.width}" 
         height="${canvas.height}" 
         xlink:href="${dataUrl}"/>
</svg>`

      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      
      return {
        success: true,
        data: blob,
        filename: `${filename}.svg`
      }
    } catch (error) {
      return {
        success: false,
        filename: '',
        error: 'Failed to create SVG'
      }
    }
  }

  /**
   * 导出PDF (打印优化)
   */
  private static async exportPDF(
    canvas: HTMLCanvasElement,
    filename: string,
    options: ExportOptions
  ): Promise<ExportResult> {
    // PDF导出需要额外的库支持
    // 这里返回错误提示用户使用PNG/SVG
    return {
      success: false,
      filename: '',
      error: 'PDF export requires additional library. Please use PNG or SVG format.'
    }
  }

  /**
   * 下载导出的文件
   */
  static downloadFile(data: Blob | string, filename: string): void {
    const url = typeof data === 'string' 
      ? data 
      : URL.createObjectURL(data)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    if (typeof data !== 'string') {
      URL.revokeObjectURL(url)
    }
  }

  /**
   * 生成文件名
   */
  private static generateFilename(format: ExportFormat): string {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')
    return `qrcode-${timestamp}`
  }

  /**
   * 高DPI导出 (打印优化)
   */
  static async exportHighDPI(
    canvas: HTMLCanvasElement,
    dpi: number = 300
  ): Promise<Blob> {
    const scale = dpi / 96 // 96是默认屏幕DPI
    const scaledCanvas = document.createElement('canvas')
    const ctx = scaledCanvas.getContext('2d')!
    
    scaledCanvas.width = canvas.width * scale
    scaledCanvas.height = canvas.height * scale
    
    ctx.scale(scale, scale)
    ctx.drawImage(canvas, 0, 0)
    
    return new Promise((resolve, reject) => {
      scaledCanvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to create high DPI image'))
        },
        'image/png',
        1
      )
    })
  }
}
