
export enum Category {
  AGRITECH = 'АгроТех',
  TOURISM = 'Туризм',
  EDUCATION = 'Обучение',
  ECOLOGY = 'Экология',
  FINTECH = 'ФинТех'
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  category: Category;
  logoUrl: string;
  founders: string[];
  stage: 'Idea' | 'MVP' | 'Growth' | 'Scale';
  location: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Hackathon' | 'Meetup' | 'Conference';
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  role: 'Founder' | 'Investor' | 'Student' | 'Mentor';
  avatarUrl: string;
  skills: string[];
  bio: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface JobOpportunity {
  id: string;
  role: string;
  startupName: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Project' | 'Volunteer';
  description: string;
}

export interface WikiArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  content: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
}