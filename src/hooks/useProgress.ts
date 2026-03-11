import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Progress } from '../types';

export function useProgress(userId: string) {
  const { isDemoMode } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // Load demo progress from localStorage
      const demoProgress = localStorage.getItem('demo_progress');
      if (demoProgress) {
        setProgress(JSON.parse(demoProgress));
      } else {
        // Create initial demo progress
        const initialProgress: Progress = {
          user_id: 'demo_user',
          learning_minutes_today: 0,
          resume_skill_count: 0,
          journey_progress_percent: 0,
          streak_days_count: 1,
          xp_earned_total: 0,
        };
        localStorage.setItem('demo_progress', JSON.stringify(initialProgress));
        setProgress(initialProgress);
      }
      setLoading(false);
    } else {
      // Load real progress from Supabase
      fetchProgress();
    }
  }, [userId, isDemoMode]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching progress:', error);
        return;
      }

      if (data) {
        setProgress(data);
      } else {
        // Create initial progress record
        const initialProgress: Progress = {
          user_id: userId,
          learning_minutes_today: 0,
          resume_skill_count: 0,
          journey_progress_percent: 0,
          streak_days_count: 1,
          xp_earned_total: 0,
        };

        const { error: insertError } = await supabase
          .from('user_progress')
          .insert([initialProgress]);

        if (insertError) {
          console.error('Error creating progress:', insertError);
        } else {
          setProgress(initialProgress);
        }
      }
    } catch (error) {
      console.error('Error in fetchProgress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<Progress>) => {
    if (!progress) return;

    const updatedProgress = { ...progress, ...updates };

    if (isDemoMode) {
      // Update demo progress in localStorage
      localStorage.setItem('demo_progress', JSON.stringify(updatedProgress));
      setProgress(updatedProgress);
    } else {
      // Update real progress in Supabase
      try {
        const { error } = await supabase
          .from('user_progress')
          .update(updates)
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          setProgress(updatedProgress);
        }
      } catch (error) {
        console.error('Error in updateProgress:', error);
      }
    }
  };

  const addLearningMinutes = (minutes: number) => {
    if (!progress) return;
    
    updateProgress({
      learning_minutes_today: progress.learning_minutes_today + minutes,
      xp_earned_total: progress.xp_earned_total + (minutes * 2) // 2 XP per minute
    });
  };

  const addSkillToResume = (skillCount: number = 1) => {
    if (!progress) return;
    
    updateProgress({
      resume_skill_count: progress.resume_skill_count + skillCount,
      xp_earned_total: progress.xp_earned_total + (skillCount * 10) // 10 XP per skill
    });
  };

  const updateJourneyProgress = (percent: number) => {
    if (!progress) return;
    
    updateProgress({
      journey_progress_percent: Math.max(progress.journey_progress_percent, percent)
    });
  };

  const incrementStreak = () => {
    if (!progress) return;
    
    updateProgress({
      streak_days_count: progress.streak_days_count + 1,
      xp_earned_total: progress.xp_earned_total + 25 // 25 XP for streak
    });
  };

  return { 
    progress, 
    loading, 
    updateProgress,
    addLearningMinutes,
    addSkillToResume,
    updateJourneyProgress,
    incrementStreak
  };
}