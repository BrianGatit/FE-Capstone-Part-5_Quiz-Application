

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizQuestion } from "@/types/quiz";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === question.correct_answer;

    setTimeout(() => {
      onAnswer(answer, isCorrect);
    }, 1500);
  };

  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const getButtonVariant = (answer: string) => {
    if (!showFeedback) return "outline";
    if (answer === question.correct_answer) return "default";
    if (answer === selectedAnswer) return "destructive";
    return "outline";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-3xl animate-scale-in">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {question.difficulty.toUpperCase()}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 shadow-card-hover">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">{question.category}</p>
            <h2 className="text-2xl font-bold leading-relaxed">
              {decodeHTML(question.question)}
            </h2>
          </div>

          <div className="space-y-3">
            {question.all_answers?.map((answer, index) => {
              const isCorrect = answer === question.correct_answer;
              const isSelected = answer === selectedAnswer;

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={showFeedback}
                  variant={getButtonVariant(answer)}
                  className={cn(
                    "w-full h-auto min-h-[60px] text-left justify-start p-4 text-base transition-all",
                    showFeedback && isCorrect && "bg-success hover:bg-success",
                    showFeedback && isSelected && !isCorrect && "bg-destructive hover:bg-destructive"
                  )}
                >
                  <span className="flex-1">{decodeHTML(answer)}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 ml-2 flex-shrink-0" />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 ml-2 flex-shrink-0" />
                  )}
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;

