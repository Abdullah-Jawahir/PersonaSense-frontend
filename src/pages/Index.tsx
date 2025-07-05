import { useState } from "react";
import { PersonalityQuiz } from "@/components/PersonalityQuiz";
import { Results } from "@/components/Results";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Brain } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [quizResults, setQuizResults] = useState<any>(null);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setQuizResults(null);
  };

  if (currentStep === 'quiz') {
    return <PersonalityQuiz onComplete={handleQuizComplete} />;
  }

  if (currentStep === 'results') {
    return <Results results={quizResults} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-[#181c23] dark:via-[#1e2330] dark:to-[#181c23] flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-teal-700 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
              PersonaSense
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-slate-300 font-medium">
            Discover a Little More About Yourself! ✨
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white/80 dark:bg-[#23272f]/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/60 dark:border-slate-700 space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">👋</span>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-100">
              Hey there! Ready to explore your personality?
            </h2>
          </div>

          <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
            At PersonaSense, we believe understanding yourself starts with reflecting on the small habits that shape your day.
            This isn't just a typical questionnaire — it's a thoughtfully designed experience that helps reveal how your daily choices reflect your inner personality.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-slate-100">🧩 How It Works</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Simple, engaging questions about your lifestyle and social habits
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                  <Sparkles className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-slate-100">🎨 Interactive UI</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Beautiful sliders and intuitive design that feels like a friendly conversation
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-slate-100 dark:bg-slate-700/30 rounded-full">
                  <Heart className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-slate-100">🚀 Instant Results</h3>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Discover if you're more Introverted 🌙 or Extroverted 🌞
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Button
            onClick={handleStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Your Personality Journey ✨
          </Button>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Takes just 2-3 minutes • No email required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
