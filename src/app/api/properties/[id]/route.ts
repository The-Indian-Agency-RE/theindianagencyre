import { NextRequest, NextResponse } from 'next/server';
import propertyService from '@/lib/propertyService';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await propertyService.getPropertyById(params.id);
    
    return NextResponse.json({ 
      success: true, 
      data: property 
    });
  } catch (error) {
    console.error('Property by ID API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Property not found' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedProperty = await propertyService.updateProperty(params.id, body);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedProperty 
    });
  } catch (error) {
    console.error('Update Property API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await propertyService.deleteProperty(params.id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Property deleted successfully' 
    });
  } catch (error) {
    console.error('Delete Property API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
