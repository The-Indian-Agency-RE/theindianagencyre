import { NextRequest, NextResponse } from 'next/server';
import propertyService from '@/lib/propertyService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      type: searchParams.get('type') || undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
    };

    // Remove undefined values
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );

    const properties = await propertyService.getProperties(cleanFilters);
    
    return NextResponse.json({ 
      success: true, 
      data: properties,
      count: properties.length 
    });
  } catch (error) {
    console.error('Properties API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProperty = await propertyService.addProperty(body);
    
    return NextResponse.json({ 
      success: true, 
      data: newProperty 
    }, { status: 201 });
  } catch (error) {
    console.error('Add Property API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add property' },
      { status: 500 }
    );
  }
}
