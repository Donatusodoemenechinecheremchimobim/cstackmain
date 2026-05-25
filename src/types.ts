export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  year: string;
  client: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export type ActivePanel = 'home' | 'work' | 'about' | 'pricing' | 'contact' | 'inbox';
