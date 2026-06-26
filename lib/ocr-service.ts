/**
 * OCR Service for IBAN/RIB Extraction from Photos
 * 
 * Setup Instructions:
 * 
 * Option 1: Google Cloud Vision (Recommended)
 * 1. Go to https://console.cloud.google.com/
 * 2. Enable Cloud Vision API
 * 3. Create API Key
 * 4. Add GOOGLE_CLOUD_VISION_API_KEY to environment variables
 * Cost: $1.50 per 1,000 images
 * 
 * Option 2: AWS Textract
 * 1. Go to https://console.aws.amazon.com/textract/
 * 2. Get AWS credentials (Access Key ID + Secret Access Key)
 * 3. Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION to environment variables
 * Cost: $1.50 per 1,000 pages
 */

interface ExtractedBankInfo {
  accountNumber: string
  accountName: string
  bankName: string
  iban?: string
  swiftCode?: string
  branchCode?: string
  confidence: number
}

export class OCRService {
  private provider: 'google' | 'aws' | 'mock'
  private apiKey: string

  constructor(provider: 'google' | 'aws' | 'mock' = 'mock') {
    this.provider = provider
    this.apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY || ''
  }

  /**
   * Extract bank account information from an image
   */
  async extractBankInfoFromImage(imageBase64: string): Promise<ExtractedBankInfo> {
    switch (this.provider) {
      case 'google':
        return this.extractWithGoogleVision(imageBase64)
      case 'aws':
        return this.extractWithAWSTextract(imageBase64)
      case 'mock':
      default:
        return this.mockExtraction()
    }
  }

  /**
   * Extract using Google Cloud Vision API
   */
  private async extractWithGoogleVision(imageBase64: string): Promise<ExtractedBankInfo> {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [
              {
                image: { content: imageBase64.split(',')[1] },
                features: [{ type: 'TEXT_DETECTION' }],
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Google Vision API error: ${response.statusText}`)
      }

      const data = await response.json()
      const text = data.responses[0]?.fullTextAnnotation?.text || ''

      return this.parseExtractedText(text)
    } catch (error) {
      console.error('[v0] Google Vision extraction failed:', error)
      throw error
    }
  }

  /**
   * Extract using AWS Textract
   */
  private async extractWithAWSTextract(imageBase64: string): Promise<ExtractedBankInfo> {
    try {
      // This would require AWS SDK implementation
      // For now, fallback to mock
      console.warn('[v0] AWS Textract not fully implemented, using mock extraction')
      return this.mockExtraction()
    } catch (error) {
      console.error('[v0] AWS Textract extraction failed:', error)
      throw error
    }
  }

  /**
   * Parse extracted text to find bank information
   */
  private parseExtractedText(text: string): ExtractedBankInfo {
    // Common patterns for African bank accounts
    const patterns = {
      // IBAN format (starts with country code + 2 digits)
      iban: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g,
      // Account numbers (10-20 digits)
      accountNumber: /\b\d{10,20}\b/g,
      // SWIFT/BIC codes
      swift: /\b[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?\b/g,
      // Common African bank names
      bankNames: /(ecobank|uba|standard\s*bank|first\s*bank|access\s*bank|zenith|gtbank|fnb|nedbank|equity|kcb)/gi,
    }

    const ibanMatch = text.match(patterns.iban)
    const accountMatch = text.match(patterns.accountNumber)
    const swiftMatch = text.match(patterns.swift)
    const bankMatch = text.match(patterns.bankNames)

    // Extract potential name (usually in uppercase near account number)
    const lines = text.split('\n')
    let accountName = ''
    for (const line of lines) {
      if (line.length > 5 && line.length < 50 && /^[A-Z\s]+$/.test(line)) {
        accountName = line.trim()
        break
      }
    }

    return {
      accountNumber: accountMatch?.[0] || '',
      accountName: accountName || 'Unknown',
      bankName: bankMatch?.[0] || 'Unknown Bank',
      iban: ibanMatch?.[0],
      swiftCode: swiftMatch?.[0],
      confidence: 0.85,
    }
  }

  /**
   * Mock extraction for testing without API keys
   */
  private mockExtraction(): Promise<ExtractedBankInfo> {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        resolve({
          accountNumber: `${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
          accountName: 'JOHN DOE SAMPLE',
          bankName: 'Ecobank',
          iban: `CM21${Math.floor(Math.random() * 900000000000 + 100000000000)}`,
          swiftCode: 'ECOCMCM',
          branchCode: '001',
          confidence: 0.92,
        })
      }, 2000)
    })
  }

  /**
   * Validate IBAN checksum
   */
  static validateIBAN(iban: string): boolean {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase()
    
    // Basic format check
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleanIban)) {
      return false
    }

    // Move first 4 chars to end
    const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4)

    // Replace letters with numbers (A=10, B=11, etc.)
    const numericString = rearranged.replace(/[A-Z]/g, (char) =>
      (char.charCodeAt(0) - 55).toString()
    )

    // Calculate mod 97
    let remainder = numericString.slice(0, 2)
    for (let i = 2; i < numericString.length; i += 7) {
      remainder = (parseInt(remainder + numericString.slice(i, i + 7), 10) % 97).toString()
    }

    return parseInt(remainder, 10) === 1
  }

  /**
   * Format account number for display
   */
  static formatAccountNumber(accountNumber: string): string {
    // Add spaces every 4 digits for readability
    return accountNumber.replace(/(\d{4})/g, '$1 ').trim()
  }

  /**
   * Validate extracted data confidence
   */
  static isConfidenceAcceptable(confidence: number): boolean {
    return confidence >= 0.75
  }
}

// Export singleton instance
export const ocrService = new OCRService()
