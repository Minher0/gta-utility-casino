import { NextResponse } from 'next/server';
import { getPodiumVehicle } from '@/lib/vehicle-scraper';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const vehicleData = await getPodiumVehicle();
    
    return NextResponse.json(vehicleData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data' },
      { status: 500 }
    );
  }
}
