import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Clock, Target, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { User as UserType } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ProfileSettingsProps {
  user: UserType;
  onNavigate: (screen: string) => void;
}

export function ProfileSettings({ user, onNavigate }: ProfileSettingsProps) {
  const { updateUserProfile, isDemoMode } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    intent_type: user.intent_type,
    available_minutes_per_day: user.available_minutes_per_day
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const intentOptions = [
    { value: 'restarting', label: 'Restarting Career', description: 'Ready to re-enter the workforce with confidence' },
    { value: 'freelancing', label: 'Freelancing', description: 'Building skills for flexible, independent work' },
    { value: 'confidence', label: 'Gaining Confidence', description: 'Growing personally and professionally' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await updateUserProfile({
        name: formData.name.trim(),
        intent_type: formData.intent_type as 'restarting' | 'freelancing' | 'confidence',
        available_minutes_per_day: formData.available_minutes_per_day
      });

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-base text-gray-600">
                Manage your account preferences
              </p>
            </div>
            
            <div className="w-12 h-12" /> {/* Spacer */}
          </motion.div>

          {/* Demo Mode Notice */}
          {isDemoMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Demo Mode:</span> Changes will be saved locally only.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className={`p-4 ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2">
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <p className={`text-sm font-medium ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {message.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture Section */}
                <div className="text-center pb-6 border-b border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {isDemoMode && (
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full mt-2">
                      Demo Account
                    </span>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email Field (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                {/* Career Intent */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Target className="w-4 h-4 inline mr-1" />
                    Career Goal
                  </label>
                  <div className="space-y-3">
                    {intentOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.intent_type === option.value
                            ? 'border-primary-300 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="intent_type"
                            value={option.value}
                            checked={formData.intent_type === option.value}
                            onChange={(e) => handleInputChange('intent_type', e.target.value)}
                            className="mt-1 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{option.label}</h4>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available Minutes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Daily Learning Time
                  </label>
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-primary-600">
                        {formData.available_minutes_per_day}
                      </span>
                      <span className="text-lg text-gray-600 ml-2">minutes per day</span>
                    </div>
                    
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={formData.available_minutes_per_day}
                      onChange={(e) => handleInputChange('available_minutes_per_day', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((formData.available_minutes_per_day - 5) / 55) * 100}%, #e5e7eb ${((formData.available_minutes_per_day - 5) / 55) * 100}%, #e5e7eb 100%)`,
                      }}
                    />
                    
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>5 min</span>
                      <span>60 min</span>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      {formData.available_minutes_per_day <= 15 && "Perfect for busy schedules"}
                      {formData.available_minutes_per_day > 15 && formData.available_minutes_per_day <= 30 && "Great for steady progress"}
                      {formData.available_minutes_per_day > 30 && "Excellent for accelerated growth"}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-100">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    loading={isLoading}
                    disabled={
                      formData.name.trim() === user.name &&
                      formData.intent_type === user.intent_type &&
                      formData.available_minutes_per_day === user.available_minutes_per_day
                    }
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Member since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.last_login_timestamp).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Account type</p>
                  <p className="font-medium text-gray-900">
                    {isDemoMode ? 'Demo Account' : 'Full Account'}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}