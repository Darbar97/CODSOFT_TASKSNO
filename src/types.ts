export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: 'Web Applications' | 'Frontend' | 'AI & Automation';
  description: string;
  highlights: string[];
  techStack: string[];
  imageUrl?: string;
  imageAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  architectureDetails?: string;
  metricsOrOutcome?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Intermediate' | 'Familiar';
    iconName: string;
    note?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certId?: string;
  regNo?: string;
  verificationBadge?: string;
  skillsCovered: string[];
  isFeatured?: boolean;
  category?: 'AI & Emerging Tech' | 'Professional & Industry' | 'Core CS & Engineering' | string;
  description?: string;
  recipient?: string;
  signatory?: string;
  modules?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  details: string;
  grade: string;
  enrollmentNo?: string;
}
