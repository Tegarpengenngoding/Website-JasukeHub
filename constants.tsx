
import { Service } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Custom AR Marketing Filter for Instagram & TikTok',
    sellerName: 'NexGen Studio',
    sellerAvatar: 'https://picsum.photos/seed/nexgen/100/100',
    description: 'High-performance Spark AR and Effect House development for viral marketing campaigns.',
    price: 450,
    category: 'Augmented Reality',
    rating: 4.9,
    reviews: 128,
    image: 'https://picsum.photos/seed/ar-marketing/800/600',
  },
  {
    id: '2',
    title: 'Immersive VR Real Estate Virtual Tour',
    sellerName: 'V-Aestate Solutions',
    sellerAvatar: 'https://picsum.photos/seed/vreal/100/100',
    description: 'Ultra-realistic VR tours compatible with Meta Quest 3 and Apple Vision Pro.',
    price: 1200,
    category: 'Virtual Reality',
    rating: 5.0,
    reviews: 45,
    image: 'https://picsum.photos/seed/vr-real/800/600',
  },
  {
    id: '3',
    title: 'Gamification System for Corporate Training',
    sellerName: 'LudoPlay Labs',
    sellerAvatar: 'https://picsum.photos/seed/ludo/100/100',
    description: 'Turn your boring training into an addictive game loop with rewards and leaderboards.',
    price: 2500,
    category: 'Gamification',
    rating: 4.8,
    reviews: 89,
    image: 'https://picsum.photos/seed/game-corp/800/600',
  },
  {
    id: '4',
    title: '3D Interactive Retail Display for Events',
    sellerName: 'HoloDisplay Tech',
    sellerAvatar: 'https://picsum.photos/seed/holo/100/100',
    description: 'Gesture-controlled interactive catalogs for trade shows and physical stores.',
    price: 1800,
    category: 'Interactive Device',
    rating: 4.7,
    reviews: 32,
    image: 'https://picsum.photos/seed/retail-3d/800/600',
  },
  {
    id: '5',
    title: 'Unreal Engine 5 Cinematic Metaverse Game',
    sellerName: 'VoidEngineers',
    sellerAvatar: 'https://picsum.photos/seed/void/100/100',
    description: 'Building high-fidelity persistent worlds with UE5 Lumen and Nanite.',
    price: 5000,
    category: 'Game Dev',
    rating: 4.9,
    reviews: 21,
    image: 'https://picsum.photos/seed/ue5-meta/800/600',
  }
];

export const CATEGORIES = [
  'All Services',
  'Augmented Reality',
  'Virtual Reality',
  'Gamification',
  'Interactive Device',
  'Game Dev'
];
