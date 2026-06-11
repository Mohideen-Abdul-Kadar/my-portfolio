import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'frontend',
    label: 'Frontend & Mobile',
    color: '#00e5ff',
    skills: [
      { name: 'React Native',    level: 95, category: 'frontend' },
      { name: 'React.js',        level: 93, category: 'frontend' },
      { name: 'Next.js',         level: 88, category: 'frontend' },
      { name: 'TypeScript',      level: 90, category: 'frontend' },
      { name: 'JavaScript',      level: 95, category: 'frontend' },
      { name: 'HTML / CSS',      level: 92, category: 'frontend' },
      { name: 'Cross-platform',  level: 90, category: 'frontend' },
    ],
  },
  {
    category: 'backend',
    label: 'State & APIs',
    color: '#a78bfa',
    skills: [
      { name: 'Redux Toolkit',   level: 90, category: 'backend' },
      { name: 'TanStack Query',  level: 85, category: 'backend' },
      { name: 'Zustand',         level: 82, category: 'backend' },
      { name: 'Context API',     level: 88, category: 'backend' },
      { name: 'REST APIs',       level: 92, category: 'backend' },
      { name: 'Socket.IO',       level: 85, category: 'backend' },
      { name: 'Webhooks',        level: 82, category: 'backend' },
    ],
  },
  {
    category: 'cloud',
    label: 'Backend & Database',
    color: '#34d399',
    skills: [
      { name: 'Node.js (Express)', level: 75, category: 'cloud' },
      { name: 'PostgreSQL',        level: 78, category: 'cloud' },
      { name: 'MySQL',             level: 78, category: 'cloud' },
      { name: 'Firebase',          level: 85, category: 'cloud' },
      { name: 'NestJS (collab)',   level: 65, category: 'cloud' },
      { name: 'Stripe / Paystack', level: 80, category: 'cloud' },
    ],
  },
  {
    category: 'tools',
    label: 'Tools & Workflow',
    color: '#fbbf24',
    skills: [
      { name: 'Git & GitHub',      level: 92, category: 'tools' },
      { name: 'GitHub Actions',    level: 78, category: 'tools' },
      { name: 'Postman',           level: 88, category: 'tools' },
      { name: 'Agile / Scrum',     level: 85, category: 'tools' },
      { name: 'GitHub Copilot',    level: 88, category: 'tools' },
      { name: 'Claude AI',         level: 90, category: 'tools' },
    ],
  },
];
