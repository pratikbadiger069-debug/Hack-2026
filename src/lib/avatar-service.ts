export type AvatarStyle =
  | 'minimalist-geometric'
  | 'cyber-builder'
  | 'abstract-gradient'
  | '3d-clay'
  | 'pixel-tech'
  | 'vector-coder'
  | 'notion-minimal';

export interface AvatarOption {
  id: string;
  name: string;
  style: AvatarStyle;
  url: string;
  colors: [string, string];
}

export const AVATAR_PRESETS: AvatarOption[] = [
  {
    id: 'preset-1',
    name: 'Cyber Core',
    style: 'cyber-builder',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    colors: ['#C76A2A', '#1B1B1B'],
  },
  {
    id: 'preset-2',
    name: 'Systems Architect',
    style: 'vector-coder',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    colors: ['#2F7A45', '#1B1B1B'],
  },
  {
    id: 'preset-3',
    name: 'Algorithmic Mind',
    style: 'abstract-gradient',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    colors: ['#3B82F6', '#8B5CF6'],
  },
  {
    id: 'preset-4',
    name: 'Deep Tech Innovator',
    style: '3d-clay',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    colors: ['#F59E0B', '#EF4444'],
  },
  {
    id: 'preset-5',
    name: 'Cloud Engineer',
    style: 'pixel-tech',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    colors: ['#06B6D4', '#3B82F6'],
  },
  {
    id: 'preset-6',
    name: 'Open Source Warrior',
    style: 'minimalist-geometric',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    colors: ['#10B981', '#047857'],
  },
];

/**
 * Generate a deterministic modern SVG avatar based on username/seed and style
 */
export function generateSvgAvatar(seed: string, style: AvatarStyle = 'minimalist-geometric'): string {
  const cleanSeed = encodeURIComponent(seed.trim().toLowerCase() || 'builder');
  
  // Use dicebear collection for ultra-crisp modern minimalist vectors
  switch (style) {
    case 'cyber-builder':
      return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case 'abstract-gradient':
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case '3d-clay':
      return `https://api.dicebear.com/7.x/thumbs/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case 'pixel-tech':
      return `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case 'vector-coder':
      return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case 'notion-minimal':
      return `https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${cleanSeed}&backgroundColor=transparent`;
    case 'minimalist-geometric':
    default:
      return `https://api.dicebear.com/7.x/micah/svg?seed=${cleanSeed}&backgroundColor=transparent`;
  }
}

/**
 * Returns default avatar for a given user or seed
 */
export function getDefaultAvatar(nameOrEmail: string): string {
  return generateSvgAvatar(nameOrEmail || 'aarav-builder', 'minimalist-geometric');
}
