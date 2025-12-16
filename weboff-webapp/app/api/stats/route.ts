import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/strapi';

/**
 * GET /api/stats
 * Получить статистику по проектам
 */
export async function GET() {
  try {
    const allProjects = await getProjects(true); // include inactive
    const activeProjects = allProjects.filter(p => p.is_active);
    
    // Группируем проекты по технологиям
    const techStats: Record<string, number> = {};
    allProjects.forEach(project => {
      project.skills.forEach(skill => {
        techStats[skill.name] = (techStats[skill.name] || 0) + 1;
      });
    });
    
    // Сортируем технологии по популярности
    const topTechnologies = Object.entries(techStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tech, count]) => ({ tech, count }));
    
    return NextResponse.json({
      success: true,
      data: {
        total: allProjects.length,
        active: activeProjects.length,
        inactive: allProjects.length - activeProjects.length,
        topTechnologies,
        lastUpdated: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('Error fetching stats from Strapi:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
