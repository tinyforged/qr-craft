import QRCode from 'qrcode'
import type { ErrorCorrectionLevel } from '../types'

export interface QRMatrix {
  size: number
  data: boolean[][]
}

export class QRGenerator {
  /**
   * 生成QR码矩阵数据
   */
  static async generateMatrix(
    data: string,
    errorCorrectionLevel: ErrorCorrectionLevel = 'H'
  ): Promise<QRMatrix> {
    try {
      // 使用qrcode库生成QR码数据
      const qrData = QRCode.create(data, {
        errorCorrectionLevel,
        maskPattern: undefined,
        version: undefined,
      })

      const size = qrData.modules.size
      const matrix: boolean[][] = []

      for (let row = 0; row < size; row++) {
        matrix[row] = []
        for (let col = 0; col < size; col++) {
          matrix[row][col] = qrData.modules.get(row, col)
        }
      }

      return { size, data: matrix }
    } catch (error) {
      console.error('Failed to generate QR matrix:', error)
      throw new Error('Failed to generate QR code')
    }
  }

  /**
   * 获取推荐的错误纠正级别
   */
  static getRecommendedErrorCorrection(dataLength: number): ErrorCorrectionLevel {
    if (dataLength > 100) return 'L' // 7%
    if (dataLength > 50) return 'M' // 15%
    if (dataLength > 20) return 'Q' // 25%
    return 'H' // 30%
  }

  /**
   * 验证QR码内容
   */
  static validateContent(content: string): { valid: boolean; message?: string } {
    if (!content || content.trim().length === 0) {
      return { valid: false, message: '内容不能为空' }
    }

    if (content.length > 2953) {
      return { valid: false, message: '内容超出最大长度限制（2953字符）' }
    }

    return { valid: true }
  }

  /**
   * 检测内容类型
   */
  static detectContentType(content: string): string {
    // URL
    if (/^https?:\/\//i.test(content)) {
      return 'url'
    }
    
    // Email
    if (/^mailto:/i.test(content) || /^[\w.-]+@[\w.-]+\.\w+$/i.test(content)) {
      return 'email'
    }
    
    // Phone
    if (/^tel:/i.test(content) || /^\+?[\d\s-()]{10,}$/.test(content)) {
      return 'phone'
    }
    
    // WiFi
    if (/^WIFI:/i.test(content)) {
      return 'wifi'
    }
    
    // vCard
    if (/^BEGIN:VCARD/i.test(content)) {
      return 'vcard'
    }
    
    // 默认文本
    return 'text'
  }
}
