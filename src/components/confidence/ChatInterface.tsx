import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Sparkles, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';

interface ChatInterfaceProps {
  user: User;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'companion';
  timestamp: Date;
  type?: 'text' | 'affirmation' | 'question';
}

const companionResponses = {
  greeting: [
    "Hello beautiful! I'm here to listen and support you. What's on your mind today?",
    "Hi there! I'm so glad you're here. How are you feeling right now?",
    "Welcome back! I've been thinking about you. What would you like to talk about?"
  ],
  encouragement: [
    "You're doing so much better than you think. Every step forward, no matter how small, is progress.",
    "I hear the strength in your words, even when you might not feel it yourself. You're incredibly resilient.",
    "Your feelings are completely valid. It's okay to have difficult days - they don't define your worth.",
    "Remember, you don't have to be perfect to be worthy of love and success. You're enough, just as you are."
  ],
  confidence: [
    "I can see your inner strength shining through. Trust yourself - you have everything you need inside you.",
    "Your journey is unique and valuable. Don't compare your chapter 1 to someone else's chapter 20.",
    "You've overcome challenges before, and you'll overcome this too. I believe in you completely.",
    "Your voice matters. Your dreams matter. You matter. Never forget that."
  ],
  overwhelmed: [
    "It sounds like you're carrying a lot right now. It's okay to feel overwhelmed - it shows how much you care.",
    "Take a deep breath with me. You don't have to figure everything out today. One step at a time.",
    "You're not alone in feeling this way. Many strong women have felt exactly what you're feeling right now.",
    "It's okay to rest. It's okay to ask for help. It's okay to take things slowly."
  ],
  tired: [
    "Your tiredness is valid. You've been working so hard, both in ways that are seen and unseen.",
    "Rest isn't giving up - it's recharging. You deserve to take care of yourself.",
    "Even superheroes need to rest. Your worth isn't measured by your productivity.",
    "It's okay to pause. Your dreams will still be there when you're ready to pursue them again."
  ],
  doubt: [
    "Self-doubt is just fear trying to keep you safe, but you're braver than your fears.",
    "Every successful woman has felt the way you're feeling right now. Doubt doesn't disqualify you.",
    "Your inner critic is not your truth. You are capable of amazing things.",
    "What would you tell a dear friend who was feeling this way? You deserve that same kindness."
  ]
};

export function ChatInterface({ user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${user.name.split(' ')[0]}! I'm your Confidence Companion. I'm here to listen, support, and remind you of your strength. How are you feeling today? 💜`,
      sender: 'companion',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('tired') || message.includes('exhausted') || message.includes('drained')) {
      return companionResponses.tired[Math.floor(Math.random() * companionResponses.tired.length)];
    } else if (message.includes('overwhelmed') || message.includes('stressed') || message.includes('too much')) {
      return companionResponses.overwhelmed[Math.floor(Math.random() * companionResponses.overwhelmed.length)];
    } else if (message.includes('doubt') || message.includes('unsure') || message.includes('can\'t') || message.includes('not good enough')) {
      return companionResponses.doubt[Math.floor(Math.random() * companionResponses.doubt.length)];
    } else if (message.includes('confident') || message.includes('strong') || message.includes('proud') || message.includes('accomplished')) {
      return companionResponses.confidence[Math.floor(Math.random() * companionResponses.confidence.length)];
    } else {
      return companionResponses.encouragement[Math.floor(Math.random() * companionResponses.encouragement.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputText);
      const companionMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'companion',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, companionMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startListening = () => {
    setIsListening(true);
    // In a real app, this would use speech recognition
    setTimeout(() => {
      setIsListening(false);
      setInputText("I'm feeling a bit overwhelmed today...");
    }, 2000);
  };

  const quickResponses = [
    "I'm feeling overwhelmed",
    "I need some encouragement",
    "I'm doubting myself",
    "I'm proud of my progress",
    "I'm feeling tired",
    "I need motivation"
  ];

  return (
    <div className="space-y-4">
      {/* Chat Messages */}
      <Card className="h-96 overflow-y-auto p-4 bg-white">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800'
                }`}>
                  {message.sender === 'companion' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-xs font-medium text-pink-600">Companion</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-medium text-pink-600">Companion</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-pink-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-pink-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-pink-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Quick Response Buttons */}
      <div className="flex flex-wrap gap-2">
        {quickResponses.map((response, index) => (
          <motion.button
            key={response}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setInputText(response)}
            className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors"
          >
            {response}
          </motion.button>
        ))}
      </div>

      {/* Input Area */}
      <Card className="p-4">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen 💜"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
              rows={2}
            />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startListening}
              className={`absolute right-3 bottom-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isListening
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-400 hover:text-pink-500'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </motion.button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}