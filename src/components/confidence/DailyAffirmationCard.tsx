import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface DailyAffirmationCardProps {
  expanded?: boolean;
}

const affirmations = [
  {
    text: "You are quietly building something powerful.",
    author: "Shadow Community",
    category: "Strength"
  },
  {
    text: "Every small step you take matters more than you know.",
    author: "Maya Angelou",
    category: "Progress"
  },
  {
    text: "You are not behind. You are on your own unique path.",
    author: "Shadow Wisdom",
    category: "Journey"
  },
  {
    text: "Your efforts — seen and unseen — have immense value.",
    author: "Shadow Community",
    category: "Worth"
  },
  {
    text: "Rest is not a reward for work completed, but a requirement for work to continue.",
    author: "Shadow Wisdom",
    category: "Self-Care"
  },
  {
    text: "You don't have to be perfect to be worthy of love and success.",
    author: "Brené Brown",
    category: "Self-Love"
  },
  {
    text: "Your invisible labor is building visible strength.",
    author: "Shadow Community",
    category: "Recognition"
  },
  {
    text: "Every woman who has ever achieved anything has felt exactly like you do right now.",
    author: "Shadow Wisdom",
    category: "Solidarity"
  }
];

export function DailyAffirmationCard({ expanded = false }: DailyAffirmationCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMessage, setShowShareMessage] = useState(false);

  const currentAffirmation = affirmations[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
    setIsBookmarked(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Affirmation from Shadow',
        text: `"${currentAffirmation.text}" - ${currentAffirmation.author}`,
      });
    } else {
      navigator.clipboard.writeText(`"${currentAffirmation.text}" - ${currentAffirmation.author}`);
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), 2000);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to user's bookmarked affirmations
  };

  if (expanded) {
    return (
      <div className="space-y-6">
        {/* Current Affirmation */}
        <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
          <div className="text-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              
              <blockquote className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
                "{currentAffirmation.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-sm text-gray-600">— {currentAffirmation.author}</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                  {currentAffirmation.category}
                </span>
              </div>
            </motion.div>

            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={handleNext}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Affirmation</span>
              </Button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookmark}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isBookmarked
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-gray-100 text-gray-400 hover:text-pink-500'
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="w-8 h-8 bg-gray-100 text-gray-400 hover:text-purple-500 rounded-full flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>

            {showShareMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-sm text-green-600 font-medium"
              >
                Copied to clipboard! ✨
              </motion.div>
            )}
          </div>
        </Card>

        {/* Affirmation Categories */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Browse by Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Strength', 'Progress', 'Journey', 'Worth', 'Self-Care', 'Self-Love'].map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  const categoryAffirmation = affirmations.find(a => a.category === category);
                  if (categoryAffirmation) {
                    setCurrentIndex(affirmations.indexOf(categoryAffirmation));
                  }
                }}
                className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-sm font-medium text-gray-700 hover:from-pink-100 hover:to-purple-100 transition-all"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">Today's Affirmation</h3>
          <motion.blockquote
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-700 italic leading-relaxed mb-3"
          >
            "{currentAffirmation.text}"
          </motion.blockquote>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">— {currentAffirmation.author}</span>
            <button
              onClick={handleNext}
              className="text-xs text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>New</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}