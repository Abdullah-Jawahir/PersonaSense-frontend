import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizProps {
  onComplete: (results: any) => void;
}

interface Answers {
  hoursAlone: number;
  stageFear: string;
  socialEvents: number;
  goOutside: number;
  drainedAfterSocializing: string;
  closeFriends: number;
  socialMediaPosting: number;
}

interface BackendData {
  Social_event_attendance: number;
  Going_outside: number;
  Friends_circle_size: number;
  Post_frequency: number;
  Stage_fear: string;
  Drained_after_socializing: string;
  Time_spent_Alone: number;
}

const questions = [
  {
    id: 'hoursAlone',
    title: 'How many hours per day (on average) do you spend alone?',
    type: 'number',
    emoji: '🏠'
  },
  {
    id: 'stageFear',
    title: 'Do you experience stage fear?',
    type: 'radio',
    options: ['Yes', 'No'],
    emoji: '🎭'
  },
  {
    id: 'socialEvents',
    title: 'On a scale of 0 to 10, how frequently do you attend social events?',
    type: 'slider',
    min: 0,
    max: 10,
    emoji: '🎉',
    scaleLabels: { low: 'Never', high: 'Very Often' }
  },
  {
    id: 'goOutside',
    title: 'On a scale of 0 to 10, how often do you go outside?',
    type: 'slider',
    min: 0,
    max: 10,
    emoji: '🌳',
    scaleLabels: { low: 'Never', high: 'Very Often' }
  },
  {
    id: 'drainedAfterSocializing',
    title: 'Do you feel drained or exhausted after socializing?',
    type: 'radio',
    options: ['Yes', 'No'],
    emoji: '😴'
  },
  {
    id: 'closeFriends',
    title: 'What is the approximate size of your close friends circle?',
    type: 'number',
    emoji: '👥'
  },
  {
    id: 'socialMediaPosting',
    title: 'On a scale of 0 to 10, how often do you post on social media or other platforms?',
    type: 'slider',
    min: 0,
    max: 10,
    emoji: '📱',
    scaleLabels: { low: 'Never', high: 'Very Often' }
  }
];

export const PersonalityQuiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Map answers to backend format
      const backendData: BackendData = {
        Social_event_attendance: answers.socialEvents || 5,
        Going_outside: answers.goOutside || 5,
        Friends_circle_size: answers.closeFriends || 5,
        Post_frequency: answers.socialMediaPosting || 5,
        Stage_fear: answers.stageFear || "No",
        Drained_after_socializing: answers.drainedAfterSocializing || "No",
        Time_spent_Alone: answers.hoursAlone || 4
      };

      try {
        // Send to backend
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const apiUrl = apiBaseUrl ? `${apiBaseUrl}/predict` : '/api/predict';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error('Failed to get prediction');
        }

        const predictionResult = await response.json();

        // Calculate personality type as fallback
        const personalityType = calculatePersonality(answers as Answers);

        onComplete({
          answers,
          personalityType: predictionResult.prediction || personalityType,
          predictionData: predictionResult
        });
      } catch (error) {
        console.error('Error getting prediction:', error);
        // Fallback to local calculation
        const personalityType = calculatePersonality(answers as Answers);
        onComplete({ answers, personalityType });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Updated logic to handle default slider values
  const isAnswered = () => {
    const currentAnswer = answers[question.id as keyof Answers];
    if (question.type === 'slider') {
      // For sliders, default value of 5 (middle) is considered answered
      return currentAnswer !== undefined || true;
    }
    return currentAnswer !== undefined;
  };

  const getCurrentSliderValue = () => {
    const currentAnswer = answers[question.id as keyof Answers] as number;
    if (currentAnswer !== undefined) {
      return currentAnswer;
    }
    // Default to middle value (5 for 0-10 scale)
    return Math.floor((question.min + question.max) / 2);
  };

  const calculatePersonality = (answers: Answers): 'Introvert' | 'Extrovert' => {
    let score = 0;

    // Higher hours alone = more introverted
    score += answers.hoursAlone > 6 ? -2 : 1;

    // Stage fear = more introverted
    score += answers.stageFear === 'Yes' ? -2 : 1;

    // High social events attendance = more extroverted (adjusted for 0-10 scale)
    score += answers.socialEvents > 7 ? 2 : answers.socialEvents < 3 ? -2 : 0;

    // Going outside frequently = more extroverted (adjusted for 0-10 scale)
    score += answers.goOutside > 7 ? 2 : answers.goOutside < 3 ? -2 : 0;

    // Drained after socializing = more introverted
    score += answers.drainedAfterSocializing === 'Yes' ? -2 : 1;

    // Large friend circle = more extroverted
    score += answers.closeFriends > 10 ? 2 : answers.closeFriends < 3 ? -2 : 0;

    // High social media posting = more extroverted (adjusted for 0-10 scale)
    score += answers.socialMediaPosting > 7 ? 2 : answers.socialMediaPosting < 2 ? -2 : 0;

    return score < 0 ? 'Introvert' : 'Extrovert';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-[#181c23] dark:via-[#1e2330] dark:to-[#181c23] flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/80 dark:bg-[#23272f]/90 backdrop-blur-sm shadow-2xl border border-white/60 dark:border-slate-700 animate-fade-in">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">
                {question.emoji}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 leading-relaxed">
                {question.title}
              </h2>
            </div>

            <div className="space-y-6">
              {question.type === 'radio' && (
                <RadioGroup
                  value={answers[question.id as keyof Answers] as string}
                  onValueChange={handleAnswer}
                  className="flex justify-center space-x-8"
                >
                  {question.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="w-5 h-5"
                      />
                      <Label
                        htmlFor={option}
                        className="text-lg font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'slider' && (
                <div className="space-y-4">
                  <Slider
                    value={[getCurrentSliderValue()]}
                    onValueChange={(value) => handleAnswer(value[0])}
                    max={question.max}
                    min={question.min}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-slate-400">
                    <span>{question.min} = {question.scaleLabels?.low}</span>
                    <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                      {getCurrentSliderValue()}
                    </span>
                    <span>{question.max} = {question.scaleLabels?.high}</span>
                  </div>
                </div>
              )}

              {question.type === 'number' && (
                <div className="flex justify-center">
                  <Input
                    type="number"
                    value={answers[question.id as keyof Answers] as number || ''}
                    onChange={(e) => handleAnswer(parseInt(e.target.value) || 0)}
                    className="w-24 text-center text-lg font-semibold bg-slate-100 dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 border-none"
                    min="0"
                    max="24"
                    placeholder="0"
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/70 text-gray-700 dark:text-slate-200 border-none"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isAnswered()}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600 text-white flex items-center space-x-2 px-6 shadow-md"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
