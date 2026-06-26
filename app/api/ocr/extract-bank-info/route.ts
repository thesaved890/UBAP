import { NextResponse } from 'next/server'
import { OCRService } from '@/lib/ocr-service'

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json()

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Initialize OCR service
    // It will use mock extraction if no API keys are configured
    const ocrService = new OCRService()
    const extractedInfo = await ocrService.extractBankInfoFromImage(imageBase64)

    return NextResponse.json({
      success: true,
      data: extractedInfo,
    })
  } catch (error: any) {
    console.error('[v0] OCR extraction error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to extract bank information' },
      { status: 500 }
    )
  }
}
