import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { getSessionUser } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download'); // 'png' or 'svg'

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const reviewPageUrl = `${baseUrl.replace(/\/$/, '')}/r/${user.slug}`;

    // Options for clean, scannable QR code
    const qrOptions = {
      errorCorrectionLevel: 'H', // High error correction
      margin: 2,
      width: 600,
      color: {
        dark: '#202124', // Subtle Google dark gray
        light: '#ffffff',
      },
    };

    if (download === 'svg') {
      const svgString = await QRCode.toString(reviewPageUrl, { ...qrOptions, type: 'svg' });
      return new Response(svgString, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': `attachment; filename="rankaro-${user.slug}-qrcode.svg"`,
        },
      });
    }

    // Default: return JSON with dataUrl and SVG for dashboard display and print preview
    const dataUrl = await QRCode.toDataURL(reviewPageUrl, qrOptions);
    const svgString = await QRCode.toString(reviewPageUrl, { ...qrOptions, type: 'svg' });

    return NextResponse.json({
      success: true,
      url: reviewPageUrl,
      slug: user.slug,
      businessName: user.businessName,
      dataUrl,
      svg: svgString,
    });
  } catch (err) {
    console.error('[QR Code API Error]:', err);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
