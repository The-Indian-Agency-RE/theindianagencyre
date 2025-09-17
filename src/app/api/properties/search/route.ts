import { NextRequest, NextResponse } from 'next/server';
import propertyService from '@/lib/propertyService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const properties = await propertyService.searchProperties(query);
    
    return NextResponse.json({ 
      success: true, 
      data: properties,
      count: properties.length,
      query: query
    });
  } catch (error) {
    console.error('Search Properties API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const properties = await propertyService.searchProperties(query);
    
    return NextResponse.json({ 
      success: true, 
      data: properties,
      count: properties.length,
      query: query
    });
  } catch (error) {
    console.error('Search Properties API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}
