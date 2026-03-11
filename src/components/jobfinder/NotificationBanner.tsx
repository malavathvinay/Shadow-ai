import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, X, Sparkles, Target, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  if (!isVisible) return null;

  const handleEnableNotifications = () => {
    setNotificationsEnabled(true);
    // In a real app, this would set up push notifications
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="p-4 bg-gradient-to-r from-secondary-50 to-primary-50 border-secondary-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">Stay Updated</h3>
              <Sparkles className="w-4 h-4 text-secondary-500" />
            </div>
            
            {!notificationsEnabled ? (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  Get notified when new women-friendly opportunities match your profile
                </p>
                
                <div className="flex items-center space-x-2 mb-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span>Personalized matches</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>Women-first opportunities</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={handleEnableNotifications}
                    size="sm"
                    className="flex-1"
                  >
                    Enable Alerts
                  </Button>
                  
                  <button
                    onClick={() => setIsVisible(false)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2"
              >
                <div className="text-green-600 font-medium mb-1">✓ Notifications Enabled!</div>
                <p className="text-sm text-gray-600">
                  We'll alert you about relevant opportunities
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}