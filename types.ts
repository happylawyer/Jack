import React from 'react';

export interface NavItem {
  label: {
    en: string;
    zh: string;
  };
  id: string;
}

export interface Attorney {
  id: number;
  name: {
    en: string;
    zh: string;
  };
  title: {
    en: string;
    zh: string;
  };
  image: string;
  bio: {
    en: string;
    zh: string;
  };
  specialty: {
    en: string;
    zh: string;
  };
  education: {
    en: string;
    zh: string;
  };
  yearsExperience: number;
  honors: {
    en: string[];
    zh: string[];
  };
}

export interface PracticeArea {
  id: number;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CaseStudy {
  id: number;
  title: {
    en: string;
    zh: string;
  };
  category: {
    en: string;
    zh: string;
  };
  background: {
    en: string;
    zh: string;
  };
  strategy: {
    en: string;
    zh: string;
  };
  result: {
    en: string;
    zh: string;
  };
}
