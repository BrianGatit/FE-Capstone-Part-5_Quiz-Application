
import { useState, useEffect } from "react";
import { QuizQuestion, UserAnswer } from "@/types/quiz";
import QuestionCard from "./QuestionCard";
import QuizResults from "./QuizResults";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface QuizGameProps {
  category: string;
  difficulty: string;
  amount: number;
  onRestart: () => void;
}

const QuizGame = ({ category, difficulty, amount, onRestart }: QuizGameProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const formattedQuestions = data.results.map((q: QuizQuestion) => ({
          ...q,
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        }));
        setQuestions(formattedQuestions);
      } else {
        toast.error("No questions available for this combination. Please try different settings.");
        onRestart();
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to load questions. Please try again.");
      onRestart();
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        answers={userAnswers}
        onRestart={onRestart}
      />
    );
  }

  return (
    <QuestionCard
      question={questions[currentQuestionIndex]}
      currentQuestion={currentQuestionIndex + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
    />
  );
};

export default QuizGame;
