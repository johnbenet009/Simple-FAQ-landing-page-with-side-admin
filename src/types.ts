export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface DBStructure {
  faqs: FAQ[];
  admin: AdminCredentials;
}