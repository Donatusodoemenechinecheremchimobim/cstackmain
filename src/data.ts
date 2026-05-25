import { Project } from './types';
import cactusEarImg from './My Google AI Studio App - Google Chrome 5_25_2026 2_21_33 AM.png';
import oildImg from './My Google AI Studio App - Google Chrome 5_25_2026 2_22_04 AM.png';

export interface PricingTier {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'CACTUS EAR',
    category: 'AUDIO BRAND / WEB EXPERIENCE',
    description: 'A beautiful eCommerce and smart sound design catalog platform.',
    longDescription: 'A gorgeous, interactive product showcase created for Cactus Ear. Built with ultra-fluid responsive layouts, premium visual grids, and custom product models that load instantly on all mobile and desktop devices. Seamless and optimized experience.',
    year: '2026',
    client: 'CACTUS EAR LABS',
    imageUrl: cactusEarImg,
    technologies: ['REACT SUITE', 'TAILWIND STYLING', 'PRODUCT CATALOG', 'ECOMMERCE UX'],
    link: 'https://cactusear.netlify.app/'
  },
  {
    id: '2',
    title: 'OILD PLATFORM',
    category: 'PROCESS DASHBOARD / MANAGEMENT',
    description: 'An industrial liquid distribution planner and metrics dashboard.',
    longDescription: 'OILD is a high-performance interactive monitoring suite built to display fluids management data, chemical optimization metrics, and real-time operational flows. Styled with high-contrast luxury components, satisfying micro-interactions, and instant telemetry feedback.',
    year: '2026',
    client: 'OILD GLOBAL CO',
    imageUrl: oildImg,
    technologies: ['REALTIME TELEMETRY', 'VITE REACT ROUTER', 'INTERACTIVE METRICS', 'DARK CORE DESIGNS'],
    link: 'https://oild.netlify.app/'
  },
  {
    id: '3',
    title: 'AETHER PORTAL',
    category: 'WEB PLATFORM / DESIGN',
    description: 'A beautiful, high-performance web platform built for high digital engagement.',
    longDescription: 'CSTACK designed and developed a fluid, highly interactive experience that merges premium editorial layout design with robust, reliable speed. Built to adapt seamlessly across mobile screens, tablets, and desktop displays, leading to incredible user feedback and flawless visual brand impact.',
    year: '2025',
    client: 'AETHER STUDIO INC',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    technologies: ['WEB DESIGN', 'REACT PLATFORM', 'INTERACTIVE MOTION', 'SPEED OPTIMIZATION'],
    link: 'https://aetherportal.cstack.net'
  },
  {
    id: '4',
    title: 'HEXAFLOW SUITE',
    category: 'MOBILE APP / UX',
    description: 'A responsive and intuitive audio controller app crafted to look and feel custom.',
    longDescription: 'A comprehensive visual and interactive product design created for modern digital devices. Built with clear structural grids, dynamic user controls, and a gorgeous, eye-friendly deep navy blue aesthetic that provides elegant night-time legibility.',
    year: '2025',
    client: 'HEXA SOUND CO',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    technologies: ['MOBILE APP DESIGN', 'USER EXPERIENCE', 'INTERFACE ANIMATION', 'AUDIO CONTROLS'],
    link: 'https://hexaflow.cstack.net'
  }
];

export const BIO_STATS = [
  { value: '340+', label: 'COMPLETED PROJECTS' },
  { value: '40+', label: 'HAPPY PARTNERS' },
  { value: '99.8%', label: 'CLIENT SATISFACTION' },
  { value: 'ON-TIME', label: 'ELEGANT DELIVERY' }
];

export const TEAM_MEMBERS = [
  { name: 'MANUCHIMSO CHRISTIAN', role: 'FOUNDER & CREATIVE DIRECTOR', focus: 'STUDIO DESIGN & STRATEGY' },
  { name: 'LIGHT ONUCHUKWU', role: 'SENIOR MOTION DESIGNER', focus: '3D INTERACTIONS & MOTION' },
  { name: 'PRINCEWILL', role: 'VISUAL BRAND DESIGNER', focus: 'IDENTITY SYSTEMS & PRINT' },
  { name: 'ANDREW GRAPHICS', role: 'GRAPHIC LAYOUT EXPERT', focus: 'TYPOGRAPHY & VECTOR ART' },
  { name: 'CHEREM DONATUS', role: 'LEAD SOFTWARE ENGINEER', focus: 'FULL-STACK DEVELOPMENT & APPS' }
];

export const CORE_SKILLS = [
  'CUSTOM MODERN WEBSITES',
  'STUNNING USER INTERFACES',
  'HIGH PERFORMANCE APPLICATIONS',
  'CREATIVE GRAPHIC DESIGN',
  'BRAND IDENTITY & GUIDELINES',
  'FLUID 3D & MOTION DESIGN'
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: '1',
    name: 'BRANDING & VISUALS',
    category: 'COMPLETE BRAND DESIGN',
    price: '$2,400',
    description: 'A beautiful, custom visual system built for ambitious brands requiring remarkable typography, logos, and graphic guidelines.',
    features: [
      'Complete Typographical Guidelines',
      'Scalable Vector Brand Materials (SVG, PDF)',
      'Subtle Grid-Based Layout Design System',
      'Custom Promotional Layouts & Formats',
      'Digital Assets & Social Templates'
    ],
    timeline: '1-2 WEEKS'
  },
  {
    id: '2',
    name: 'PREMIUM WEBSITE',
    category: 'WEB DESIGN & DEVELOPMENT',
    price: '$5,800',
    description: 'CSTACK’s signature standard. A gorgeous, ultra-fast and fully custom responsive website built to convert and delight visitors.',
    features: [
      'State-of-the-Art Custom Web Pages',
      'Delightful 3D Hover & Interactive Effects',
      'Polished Dark or Light Frame Aesthetics',
      'Subtle Ambient Page Transitions',
      'Contact Message Inbox Console',
      'Full Technical Support & Warranty'
    ],
    timeline: '3 WEEKS'
  },
  {
    id: '3',
    name: 'CUSTOM WEBSITE & APP',
    category: 'FULL-STACK DIGITAL SUITE',
    price: '$12,000',
    description: 'Our ultimate, fully customized package. We craft cross-platform websites, native apps, custom database systems, and breathtaking motion controls.',
    features: [
      'Stunning Web + Native Mobile Apps',
      'Highly Custom Interactive 3D Mockups',
      'Powerful Behind-the-scenes Integrations',
      'Complete Logo & Vector Graphics Package',
      'Inspirational Customized Layout Designs',
      'Priority Support & Launch Optimization Setup'
    ],
    timeline: '4-6 WEEKS'
  }
];
