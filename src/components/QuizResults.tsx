

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAnswer } from "@/types/quiz";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  answers: UserAnswer[];
  onRestart: () => void;
}

const QuizResults = ({ score, totalQuestions, answers, onRestart }: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 50) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };

  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="w-full max-w-4xl animate-scale-in">
        <Card className="p-8 shadow-card-hover mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-6">
              <Trophy className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{getScoreMessage()}</h1>
            <p className="text-2xl text-muted-foreground mb-6">
              Your Score: <span className="font-bold text-primary">{score}</span> out of{" "}
              {totalQuestions}
            </p>
            <div className="inline-block">
              <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {percentage}%
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 shadow-card mb-6">
          <h2 className="text-2xl font-bold mb-6">Review Your Answers</h2>
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all",
                  answer.isCorrect
                    ? "border-success/30 bg-success/5"
                    : "border-destructive/30 bg-destructive/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {answer.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-2">
                      Question {index + 1}: {decodeHTML(answer.question)}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Your answer:</span>{" "}
                        <span
                          className={cn(
                            "font-medium",
                            answer.isCorrect ? "text-success" : "text-destructive"
                          )}
                        >
                          {decodeHTML(answer.userAnswer)}
                        </span>
                      </p>
                      {!answer.isCorrect && (
                        <p>
                          <span className="text-muted-foreground">Correct answer:</span>{" "}
                          <span className="font-medium text-success">
                            {decodeHTML(answer.correctAnswer)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
