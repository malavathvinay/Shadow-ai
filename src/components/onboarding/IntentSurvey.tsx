import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface IntentSurveyProps {
  onComplete: (intent: string, minutes: number) => void;
}

const intents = [
  {
    id: 'restarting',
    title: 'Restarting Career',
    description: 'Ready to re-enter the workforce with confidence',
    icon: RefreshCw,
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'freelancing',
    title: 'Freelancing',
    description: 'Building skills for flexible, independent work',
    icon: Briefcase,
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    id: 'confidence',
    title: 'Gaining Confidence',
    description: 'Growing personally and professionally',
    icon: Heart,
    color: 'from-peach-400 to-accent-500',
  },
];

export function IntentSurvey({ onComplete }: IntentSurveyProps) {
  const [selectedIntent, setSelectedIntent] = useState<string>('');
  const [availableMinutes, setAvailableMinutes] = useState<number>(10);
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step === 1 && selectedIntent) {
      setStep(2);
    } else if (step === 2) {
      onComplete(selectedIntent, availableMinutes);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-peach-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            {[1, 2].map((num) => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full mx-1 ${
                  num <= step ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
            {step === 1 ? "What's your goal?" : "How much time do you have?"}
          </h2>
          <p className="text-gray-600">
            {step === 1
              ? "Choose what resonates most with your current journey"
              : "We'll customize your experience to fit your schedule"}
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 mb-8"
          >
            {intents.map((intent, index) => {
              const Icon = intent.icon;
              return (
                <motion.div
                  key={intent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    hover
                    onClick={() => setSelectedIntent(intent.id)}
                    className={`p-4 border-2 transition-all ${
                      selectedIntent === intent.id
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${intent.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {intent.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {intent.description}
                        </p>
                      </div>
                      {selectedIntent === intent.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                        >
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {availableMinutes}
                </span>
                <span className="text-lg text-gray-600 ml-2">minutes per day</span>
              </div>
              
              <input
                type="range"
                min="5"
                max="30"
                value={availableMinutes}
                onChange={(e) => setAvailableMinutes(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((availableMinutes - 5) / 25) * 100}%, #e5e7eb ${((availableMinutes - 5) / 25) * 100}%, #e5e7eb 100%)`,
                }}
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>5 min</span>
                <span>30 min</span>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                {availableMinutes <= 10 && "Perfect for busy schedules"}
                {availableMinutes > 10 && availableMinutes <= 20 && "Great for steady progress"}
                {availableMinutes > 20 && "Excellent for accelerated growth"}
              </div>
            </Card>
          </motion.div>
        )}

        <Button
          onClick={handleNext}
          size="lg"
          className="w-full"
          disabled={step === 1 && !selectedIntent}
        >
          {step === 1 ? 'Next' : "Let's Go"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}