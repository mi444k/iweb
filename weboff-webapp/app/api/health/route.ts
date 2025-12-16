import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

/**
 * GET /api/health
 * Проверка состояния приложения и базы данных
 */
export async function GET() {
  try {
    // Проверяем подключение к БД
    const db = getDatabase();
    const result = db.prepare('SELECT 1 as health').get() as { health: number };
    
    const isHealthy = result.health === 1;
    
    return NextResponse.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: isHealthy ? 'connected' : 'disconnected',
      version: process.env.npm_package_version || '1.0.0',
      node: process.version,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
