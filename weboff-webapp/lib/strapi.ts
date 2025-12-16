import { Project, Skill, Media } from '@/types';

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
const STRAPI_KEY = process.env.STRAPI_API_KEY;

// --- Strapi Response Types (Flat Structure) ---
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi returns flat objects, not nested { id, attributes }
interface StrapiProject {
  id: number;
  documentId: string;
  title: string;
  description: string;
  link?: string;
  order_index?: number;
  is_active?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  media: StrapiMediaItem[] | null;
  skills: StrapiSkillItem[];
  localizations?: unknown[];
}

interface StrapiSkillItem {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  level: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

interface StrapiMediaItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, unknown>;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

// --- Mapping Functions ---

function mapStrapiToSkill(item: StrapiSkillItem): Skill {
    const levelMap: Record<number, Skill['level']> = {
        1: 'Beginner',
        5: 'Intermediate',
        7: 'Advanced',
        10: 'Expert',
    };

    return {
        id: item.id,
        name: item.name,
        description: item.description || undefined,
        level: levelMap[item.level] || 'Intermediate',
    };
}

function mapStrapiToMedia(item: StrapiMediaItem): Media {
    return {
        id: item.id,
        attributes: {
            name: item.name,
            alternativeText: item.alternativeText || undefined,
            caption: item.caption || undefined,
            width: item.width,
            height: item.height,
            formats: item.formats,
            hash: item.hash,
            ext: item.ext,
            mime: item.mime,
            size: item.size,
            url: item.url,
            previewUrl: item.previewUrl || undefined,
            provider: item.provider,
            provider_metadata: item.provider_metadata || undefined,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        },
    };
}

function mapStrapiToProject(item: StrapiProject): Project {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        link: item.link,
        order_index: item.order_index,
        is_active: item.is_active ?? (!!item.publishedAt),
        media: item.media ? item.media.map(mapStrapiToMedia) : [],
        skills: item.skills ? item.skills.map(mapStrapiToSkill) : [],
    };
}

// --- API Fetch Utility ---

async function fetchFromStrapi<T>(path: string, options: RequestInit = {}): Promise<T> {
    const populateParams = 'populate=*';
    const separator = path.includes('?') ? '&' : '?';
    const url = `${STRAPI_URL}/api${path}${separator}${populateParams}`;
    
    if (!STRAPI_KEY) {
        throw new Error('STRAPI_API_KEY is not defined in your environment variables.');
    }

    const headers = {
        'Authorization': `Bearer ${STRAPI_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, { ...options, headers, cache: 'no-store' });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Strapi API Error (${response.status}):`, errorBody);
            throw new Error(`Strapi API request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch from Strapi:', error);
        throw error;
    }
}

// --- Exported API Functions ---

export async function getProjects(includeInactive = false): Promise<Project[]> {
    const publicationState = includeInactive ? 'preview' : 'live';
    const response = await fetchFromStrapi<StrapiResponse<StrapiProject[]>>(`/projects?publicationState=${publicationState}`);
    return response.data.map(mapStrapiToProject);
}

export async function getProjectById(id: number): Promise<Project | null> {
    try {
        const response = await fetchFromStrapi<{ data: StrapiProject }>(`/projects/${id}`);
        return response.data ? mapStrapiToProject(response.data) : null;
    } catch (error) {
        console.warn(`Project with id ${id} not found:`, error);
        return null;
    }
}

export async function searchProjects(query: string): Promise<Project[]> {
    const response = await fetchFromStrapi<StrapiResponse<StrapiProject[]>>(
        `/projects?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&publicationState=live`
    );
    return response.data.map(mapStrapiToProject);
}
