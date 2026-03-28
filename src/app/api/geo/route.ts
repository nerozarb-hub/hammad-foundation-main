import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      next: { revalidate: 3600 }
    });
    const data = await response.json();

    if (data.status !== 'success') {
      return NextResponse.json({ country_code: 'US', city: 'Houston' });
    }

    return NextResponse.json({
      country_code: data.countryCode,
      city: data.city,
    });
  } catch {
    return NextResponse.json({ country_code: 'US', city: 'Houston' });
  }
}
