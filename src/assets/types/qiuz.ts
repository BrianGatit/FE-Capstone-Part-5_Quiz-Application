

export interface QuizCategory {
  id: number;
  name: string;
}

export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[];
}

export interface QuizConfig {
  category: string;
  difficulty: string;
  amount: number;
}

export interface UserAnswer {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
