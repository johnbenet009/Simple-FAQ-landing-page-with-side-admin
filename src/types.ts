export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutInfo {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface DBStructure {
  faqs: FAQ[];
  services: Service[];
  about: AboutInfo[];
  admin: AdminCredentials;
}