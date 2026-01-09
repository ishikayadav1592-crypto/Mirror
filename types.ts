
export type FOMOLevel = 'Low' | 'Moderate' | 'High';

export type AppView = 'landing' | 'quiz' | 'dashboard' | 'methodology' | 'settings' | 'creator';

export interface Option {
  label: string;
  value: string;
  points: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  construct: 'Emotional' | 'Compulsive' | 'Control' | 'Awareness';
}

export interface QuizResults {
  totalScore: number;
  level: FOMOLevel;
  breakdown: {
    emotional: number;
    compulsive: number;
    control: number;
    awareness: number;
  };
  answers: Record<string, number>;
  timestamp?: string;
  id?: string;
}

export interface UserState {
  hasCompletedQuiz: boolean;
  results: QuizResults | null;
}

export interface BackendDatabase {
  records: QuizResults[];
}
