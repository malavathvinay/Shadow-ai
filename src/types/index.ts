export interface User {
  id: string;
  name: string;
  email: string;
  intent_type: 'restarting' | 'freelancing' | 'confidence';
  available_minutes_per_day: number;
  onboarding_complete: boolean;
  last_login_timestamp: Date;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  pace: 'light' | 'medium' | 'intense';
  ai_plan_id: string;
  weekly_task_list: Task[];
  journey_day_1_status: boolean;
  created_at: Date;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  week: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'audio' | 'text';
  duration: number;
  category: string;
  skill_tags: string[];
  content: string;
}

export interface Progress {
  user_id: string;
  learning_minutes_today: number;
  resume_skill_count: number;
  journey_progress_percent: number;
  streak_days_count: number;
  xp_earned_total: number;
}

export interface DailyNudge {
  id: string;
  title: string;
  message: string;
  audio_url?: string;
  type: 'motivation' | 'goal' | 'confidence';
}