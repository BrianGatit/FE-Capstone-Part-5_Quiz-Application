
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { QuizCategory, QuizConfig } from "@/types/quiz";
import { Loader2, Brain } from "lucide-react";

interface QuizSetupProps {
  onStartQuiz: (config: QuizConfig) => void;
}

const QuizSetup = ({ onStartQuiz }: QuizSetupProps) => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<QuizConfig>({
    category: "",
    difficulty: "medium",
    amount: 10,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (config.category) {
      onStartQuiz(config);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-2xl p-8 shadow-card-hover animate-scale-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Quiz Master
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge with fun trivia questions
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">
                Select Category
              </Label>
              <Select
                value={config.category}
                onValueChange={(value) => setConfig({ ...config, category: value })}
              >
                <SelectTrigger id="category" className="h-12">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-base font-semibold">
                Difficulty Level
              </Label>
              <Select
                value={config.difficulty}
                onValueChange={(value) => setConfig({ ...config, difficulty: value })}
              >
                <SelectTrigger id="difficulty" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-base font-semibold">
                Number of Questions
              </Label>
              <Select
                value={config.amount.toString()}
                onValueChange={(value) => setConfig({ ...config, amount: parseInt(value) })}
              >
                <SelectTrigger id="amount" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleStartQuiz}
              disabled={!config.category}
              className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Start Quiz
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizSetup;
