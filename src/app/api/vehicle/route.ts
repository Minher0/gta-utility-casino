import { NextResponse } from 'next/server';
import { getPodiumVehicle } from '@/lib/vehicle-scraper';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const vehicleData = await getPodiumVehicle();
    
    // Return with headers to prevent client-side caching
    // This ensures data is fetched fresh on each page load
    return NextResponse.json(vehicleData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch vehicle data' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}
