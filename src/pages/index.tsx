
import { useState } from "react";
import QuizSetup from "@/components/QuizSetup";
import QuizGame from "@/components/QuizGame";
import { QuizConfig } from "@/types/quiz";

const Index = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);

  const handleStartQuiz = (config: QuizConfig) => {
    setQuizConfig(config);
    setQuizStarted(true);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuizConfig(null);
  };

  return (
    <>
      {!quizStarted ? (
        <QuizSetup onStartQuiz={handleStartQuiz} />
      ) : (
        quizConfig && (
          <QuizGame
            category={quizConfig.category}
            difficulty={quizConfig.difficulty}
            amount={quizConfig.amount}
            onRestart={handleRestart}
          />
        )
      )}
    </>
  );
};

export default Index;


