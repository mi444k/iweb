import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/lib/strapi';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid project ID' 
      },
      { status: 400 }
    );
  }

  try {
    const project = await getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Project not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch project' 
      },
      { status: 500 }
    );
  }
}
