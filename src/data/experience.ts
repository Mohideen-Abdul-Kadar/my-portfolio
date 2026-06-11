import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Redblox Technology Pvt. Ltd.',
    role: 'Software Developer',
    period: 'April 2023 — Present',
    description:
      'Led the end-to-end modernization of the Swypatune mobile application using React Native, improving scalability, maintainability, and user experience for a platform serving 10,000+ users.',
    highlights: [
      'Designed and implemented a modular, feature-based architecture enabling faster feature development and cleaner code organization.',
      'Built real-time features — chat, stories, matching, push notifications — using Socket.IO with typing indicators, read receipts, and live updates.',
      'Integrated Stripe, Paystack, and Flutterwave payment gateways with secure webhook-based transaction handling.',
      'Integrated Firebase Auth, Firestore, Cloud Messaging, and Crashlytics for auth, notifications, analytics, and monitoring.',
      'Managed production releases and App Store / Google Play deployments across multiple versions (Android & iOS).',
      'Collaborated with product managers, designers, QA, and backend teams in Agile/Scrum environments.',
    ],
    technologies: [
      'React Native', 'React.js', 'Next.js', 'TypeScript', 'Redux Toolkit',
      'TanStack Query', 'Socket.IO', 'Firebase', 'Stripe', 'Node.js', 'Git / GitHub',
    ],
    type: 'full-time',
  },
  {
    id: 'exp-2',
    company: 'Redblox Technology Pvt. Ltd.',
    role: 'Intern — Junior Software Developer',
    period: 'February 2023 — April 2023',
    description:
      'Developed responsive user interfaces using React.js and React Native while contributing to live client projects under senior developer guidance.',
    highlights: [
      'Integrated REST APIs, built reusable UI components, and gained hands-on mobile development experience.',
      'Collaborated using Git, participated in code reviews, bug fixing, and Agile development workflows.',
      'Successfully transitioned to a full-time Software Developer role based on performance and technical growth.',
    ],
    technologies: ['React.js', 'React Native', 'JavaScript', 'REST APIs', 'Git / GitHub'],
    type: 'internship',
  },
  {
    id: 'edu-1',
    company: "St. Joseph's College of Arts and Science",
    role: 'Bachelor of Computer Applications (BCA)',
    period: '2019 – 2022',
    description:
      'Completed a three-year undergraduate program in Computer Applications, building a strong foundation in programming, software development, and computer science fundamentals.',
    highlights: [
      'Affiliated to Thiruvalluvar University, Cuddalore, Tamil Nadu.',
      'Degree attested for UAE certification.',
    ],
    technologies: [],
    location: 'Cuddalore, Tamil Nadu, India',
    extra: 'UAE Attested',
    type: 'education',
  },
];
