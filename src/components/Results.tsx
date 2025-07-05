import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RefreshCw, Share2 } from "lucide-react";

interface ResultsProps {
  results: {
    personalityType: 'Introvert' | 'Extrovert';
    answers: any;
    predictionData?: {
      prediction: string;
      confidence: number;
      user_id: string;
      timestamp: string;
    };
  };
  onRestart: () => void;
}

const personalityData = {
  Introvert: {
    emoji: '🌙',
    title: 'Introvert',
    subtitle: 'The Thoughtful Observer',
    description: 'You tend to recharge through solitude and prefer deeper, meaningful connections over large social gatherings. You think before you speak and often have rich inner worlds.',
    traits: [
      'Prefers quiet environments',
      'Thinks before speaking',
      'Values deep relationships',
      'Enjoys solitary activities',
      'Observant and reflective',
      'Comfortable with silence'
    ],
    color: 'from-slate-600 to-blue-700',
    badge: 'bg-blue-600',
    didYouKnow: 'bg-gradient-to-r from-blue-600 to-teal-600',
    darkAccent: 'border-l-4 border-blue-500',
    darkDidYouKnow: 'bg-[#1a2233]/90',
    darkTrait: 'bg-[#232b3a]/80',
    darkCard: 'bg-[#232b3a]/95',
    bgColor: 'from-slate-50 to-blue-50',
    darkBg: 'from-[#101624] to-[#232b3a]'
  },
  Extrovert: {
    emoji: '🌞',
    title: 'Extrovert',
    subtitle: 'The Social Energizer',
    description: 'You gain energy from social interactions and tend to think out loud. You enjoy being around people and are often comfortable being the center of attention.',
    traits: [
      'Energized by social interaction',
      'Thinks out loud',
      'Enjoys group activities',
      'Comfortable in crowds',
      'Expressive and outgoing',
      'Quick to share ideas'
    ],
    color: 'from-teal-600 to-blue-600',
    badge: 'bg-teal-600',
    didYouKnow: 'bg-gradient-to-r from-blue-600 to-teal-600',
    darkAccent: 'border-l-4 border-teal-400',
    darkDidYouKnow: 'bg-[#1a2233]/90',
    darkTrait: 'bg-[#232b3a]/80',
    darkCard: 'bg-[#232b3a]/95',
    bgColor: 'from-teal-50 to-blue-50',
    darkBg: 'from-[#101624] to-[#232b3a]'
  }
};

export const Results = ({ results, onRestart }: ResultsProps) => {
  const personality = personalityData[results.personalityType];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PersonaSense Results',
        text: `I just discovered I'm a ${results.personalityType} on PersonaSense! ✨`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just discovered I'm a ${results.personalityType} on PersonaSense! ✨ Check it out at ${window.location.href}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-[#101624] dark:to-[#232b3a] flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-8xl animate-bounce">
            {personality.emoji}
          </div>
          <div className="space-y-2">
            <Badge
              className={`text-lg px-4 py-2 bg-gradient-to-r ${personality.color} text-white border-0`}
            >
              Your Personality Type
            </Badge>
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${personality.color} bg-clip-text text-transparent`}>
              {personality.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-white font-medium">
              {personality.subtitle}
            </p>
          </div>
        </div>

        {/* Main Results Card */}
        <Card className="bg-white dark:bg-[#232b3a]/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 space-y-8">
            {/* Description */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                What This Means
              </h2>
              <p className="text-lg text-gray-600 dark:text-white leading-relaxed max-w-2xl mx-auto">
                {personality.description}
              </p>
            </div>

            {/* Traits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                Your Key Traits
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {personality.traits.map((trait, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-[#232b3a]/80 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-700 dark:text-white font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prediction Confidence */}
            {results.predictionData && (
              <div className={`p-6 rounded-2xl bg-gradient-to-r ${personality.bgColor} border-l-4 border-gradient-to-b ${personality.color}`}>
                <h4 className={`font-semibold mb-2 ${results.personalityType === 'Introvert' ? 'text-white' : 'text-gray-800'}`}>🎯 AI Prediction Confidence</h4>
                <p className={`font-medium ${results.personalityType === 'Introvert' ? 'text-white' : 'text-gray-800'}`}>
                  <span className="font-semibold">Our AI model is {results.predictionData.confidence}% confident</span> in this prediction based on your responses!
                </p>
                <p className={`text-sm mt-2 ${results.personalityType === 'Introvert' ? 'text-white/80' : 'text-gray-800/80'}`}>
                  User ID: {results.predictionData.user_id.slice(0, 8)}...
                </p>
              </div>
            )}

            {/* Fun Fact - Updated with better contrast */}
            <div className={`p-6 rounded-2xl bg-gradient-to-r ${personality.bgColor} border-l-4 border-gradient-to-b ${personality.color}`}>
              <h4 className={`font-semibold mb-2 ${results.personalityType === 'Introvert' ? 'text-white' : 'text-gray-800'}`}>💡 Did You Know?</h4>
              <p className={`font-medium ${results.personalityType === 'Introvert' ? 'text-white' : 'text-gray-800'}`}>
                {results.personalityType === 'Introvert'
                  ? <span><span className="font-semibold">About 25-40% of the population are introverts.</span> Famous introverts include Albert Einstein, J.K. Rowling, and Bill Gates!</span>
                  : <span><span className="font-semibold">About 60-75% of the population are extroverts.</span> Famous extroverts include Oprah Winfrey, Robin Williams, and Richard Branson!</span>
                }
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center space-x-2 px-6 py-3"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Results</span>
              </Button>

              <Button
                onClick={onRestart}
                className={`bg-gradient-to-r ${personality.color} hover:opacity-90 text-white flex items-center space-x-2 px-6 py-3`}
              >
                <RefreshCw className="h-4 w-4" />
                <span>Take Quiz Again</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-white">
          <p>
            Remember, personality types are just one way to understand yourself.
            You're unique and can have traits from both types! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
