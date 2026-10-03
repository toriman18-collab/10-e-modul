export type StudentClass = 'X-A' | 'X-B' | 'X-C';

export type TokenType = 'quiz' | 'competency';
export type TokenStatus = 'active' | 'used' | 'inactive';

export interface ExamToken {
  id: string;
  code: string;
  type: TokenType;
  status: TokenStatus;
  createdAt: string;
  expiresAt: string;
  createdBy: string;
}

export interface StudentProfile {
  name: string;
  studentClass: StudentClass;
  loggedInAt: string;
}

export type QuestionType = 'single_choice' | 'true_false' | 'multiple_choice' | 'matching';

export interface QuizQuestion {
  id: number;
  type: 'single_choice' | 'true_false';
  stimulus?: string;
  question: string;
  options: string[];
  correctAnswer: number | boolean; // index for single_choice or boolean for true_false
  explanation: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface CompetencyQuestion {
  id: number;
  type: QuestionType;
  difficulty: 'Low' | 'Medium' | 'High';
  stimulus: string;
  question: string;
  options?: string[]; // for single_choice or multiple_choice
  correctAnswer?: number | boolean | number[]; // index, boolean, or array of indices
  matchingPairs?: MatchingPair[]; // for matching questions
  explanation: string;
}

export interface ExamResult {
  id: string;
  studentName: string;
  studentClass: StudentClass;
  examType: TokenType;
  tokenUsed: string;
  startTime: string;
  endTime: string;
  score: number; // 0 - 100
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  percentage: number;
  category: string; // 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan'
  submittedAt: string;
}

export interface StudentAnswerState {
  [questionId: number]: {
    answer: any;
    isFlagged?: boolean; // ragu-ragu
  };
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
