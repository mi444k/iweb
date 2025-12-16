import { NextRequest, NextResponse } from 'next/server';
import { searchProjects } from '@/lib/strapi';

/**
 * GET /api/search
 * Поиск проектов по ключевым словам
 * 
 * Query params:
 *   ?q=keyword - поисковый запрос
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing search query',
          message: 'Please provide a search query using ?q=keyword'
        },
        { status: 400 }
      );
    }
    
    const results = await searchProjects(query);
    
    return NextResponse.json({
      success: true,
      query,
      data: results,
      count: results.length
    });
  } catch (error) {
    console.error('Error searching projects in Strapi:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Search failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
