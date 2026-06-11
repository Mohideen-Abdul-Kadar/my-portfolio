import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Swypatune',
    description:
      'Social music & talent platform serving 10,000+ users. Led complete mobile application development including architecture design, advanced social features, and production releases.',
    impact:
      'Independently led end-to-end modernization — modular architecture, real-time chat, stories, subscriptions, and social matching for 10,000+ active users.',
    technologies: [
      'React Native', 'Redux Toolkit', 'TanStack Query', 'Socket.IO',
      'Firebase', 'Node.js (Express)', 'NestJS', 'MySQL', 'Cross-platform',
    ],
    logo: '/logos/swypatune.png',
    links: {
      android: 'https://play.google.com/store/apps/details?id=com.swypeglobal&hl=en_IN',
      ios: 'https://apps.apple.com/in/app/swypatune-global/id6737972162',
    },
    featured: true,
    gradient: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    id: 'proj-2',
    title: 'Lovu Travel',
    description:
      'Cross-platform romantic travel marketplace connecting couples with hotels, travel advisors, and experience providers for personalized trip planning.',
    impact:
      'Delivered full Stripe payment integration, real-time Firebase chat, and booking workflows enabling seamless end-to-end transactions.',
    technologies: [
      'React Native', 'React.js', 'Firebase', 'Stripe', 'Laravel', 'MySQL',
    ],
    logo: '/logos/lovu.svg',
    links: {
      android: 'https://play.google.com/store/apps/details?id=com.lovuapp',
      ios: 'https://apps.apple.com/ee/app/lovu-trips/id1668732997',
      live: 'https://lovu.travel/',
    },
    featured: true,
    gradient: 'from-violet-500/20 to-purple-600/20',
  },
  {
    id: 'proj-3',
    title: 'Plateaway',
    description:
      'Restaurant ordering platform web dashboard with reusable components, scalable architecture, and integration with NestJS APIs.',
    impact:
      'Contributed to enterprise-level codebase with modular frontend, integrated NestJS APIs, and delivered features in Agile sprint cycles.',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'REST APIs'],
    logo: '/logos/plateaway.png',
    links: {},
    featured: true,
    gradient: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    id: 'proj-4',
    title: 'Gestfy',
    description:
      'ISP field operations management mobile app with offline support, local storage capabilities, and optimized workflows for field users.',
    impact:
      'Improved operational efficiency through clean mobile UI and optimized workflows for field operations teams.',
    technologies: ['React Native', 'Offline Storage', 'REST APIs'],
    logo: '/logos/gestfy.png',
    links: {
      android: 'https://play.google.com/store/apps/details?id=com.gluestack.uiexamplenativewind&hl=es',
    },
    featured: false,
    gradient: 'from-orange-500/20 to-amber-600/20',
  },
];
