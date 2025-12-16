import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('all') === 'true';
    
    const projects = await getProjects(includeInactive);
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching projects from Strapi:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

