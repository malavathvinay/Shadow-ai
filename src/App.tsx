import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Welcome } from './components/onboarding/Welcome';
import { IntentSurvey } from './components/onboarding/IntentSurvey';
import { Dashboard } from './components/dashboard/Dashboard';
import { GoalMapper } from './components/goalmapper/GoalMapper';
import { LearningHub } from './components/microlearning/LearningHub';
import { ResumeGenerator } from './components/shadowresume/ResumeGenerator';
import { JobFinder } from './components/jobfinder/JobFinder';
import { ConfidenceCompanion } from './components/confidence/ConfidenceCompanion';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { ProfileSettings } from './components/profile/ProfileSettings';

function App() {
  // ✅ All hooks at the top level - ALWAYS called unconditionally
  const { user, loading, signIn, signUp, signOut, updateUserProfile } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<string>('loading');

  // ✅ useEffect at top level - determines screen based on auth state
  useEffect(() => {
    if (loading) {
      setCurrentScreen('loading');
    } else if (!user) {
      setCurrentScreen('login');
    } else if (!user.onboarding_complete) {
      setCurrentScreen('welcome');
    } else {
      setCurrentScreen('dashboard');
    }
  }, [user, loading]);

  // Handler functions
  const handleLogin = async (email: string, password: string) => {
    return await signIn(email, password);
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    return await signUp(email, password, name);
  };

  const handleOnboardingStart = () => {
    setCurrentScreen('survey');
  };

  const handleSurveyComplete = async (intent: string, minutes: number) => {
    if (!user) return;
    
    await updateUserProfile({
      intent_type: intent as 'restarting' | 'freelancing' | 'confidence',
      available_minutes_per_day: minutes,
      onboarding_complete: true,
    });
    
    setCurrentScreen('dashboard');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentScreen('login');
  };

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading Shadow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      {/* Public Routes */}
      {currentScreen === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentScreen('signup')}
        />
      )}
      
      {currentScreen === 'signup' && (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentScreen('login')}
        />
      )}
      
      {/* Onboarding Routes - Protected but don't require completed onboarding */}
      {currentScreen === 'welcome' && (
        <ProtectedRoute requireOnboarding={false}>
          <Welcome onStart={handleOnboardingStart} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'survey' && (
        <ProtectedRoute requireOnboarding={false}>
          <IntentSurvey onComplete={handleSurveyComplete} />
        </ProtectedRoute>
      )}
      
      {/* Protected Routes - Require authentication and completed onboarding */}
      {currentScreen === 'dashboard' && (
        <ProtectedRoute>
          <Dashboard user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'profile-settings' && (
        <ProtectedRoute>
          <ProfileSettings user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'goal-mapper' && (
        <ProtectedRoute>
          <GoalMapper user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'learning' && (
        <ProtectedRoute>
          <LearningHub user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'resume' && (
        <ProtectedRoute>
          <ResumeGenerator user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'jobs' && (
        <ProtectedRoute>
          <JobFinder user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {currentScreen === 'confidence' && (
        <ProtectedRoute>
          <ConfidenceCompanion user={user!} onNavigate={handleNavigation} />
        </ProtectedRoute>
      )}
      
      {/* Placeholder for other screens */}
      {!['login', 'signup', 'welcome', 'survey', 'dashboard', 'profile-settings', 'goal-mapper', 'learning', 'resume', 'jobs', 'confidence'].includes(currentScreen) && (
        <ProtectedRoute>
          <div className="min-h-screen w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
            <div className="max-w-screen-xl mx-auto w-full">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-900 mb-4">
                  {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1).replace('-', ' ')}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Coming soon...</p>
                <button
                  onClick={() => handleNavigation('dashboard')}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-sm sm:text-base"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </ProtectedRoute>
      )}
    </div>
  );
}

export default App;