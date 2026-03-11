/*
  # Add User Progress Tracking

  1. New Tables
    - `user_progress`
      - `user_id` (uuid, foreign key to users)
      - `learning_minutes_today` (integer)
      - `resume_skill_count` (integer)
      - `journey_progress_percent` (integer)
      - `streak_days_count` (integer)
      - `xp_earned_total` (integer)
      - `last_activity_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_progress` table
    - Add policies for users to manage their own progress

  3. Indexes
    - Add indexes for better query performance
*/

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  learning_minutes_today INTEGER DEFAULT 0,
  resume_skill_count INTEGER DEFAULT 0,
  journey_progress_percent INTEGER DEFAULT 0,
  streak_days_count INTEGER DEFAULT 1,
  xp_earned_total INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user_progress table
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_progress_updated_at 
    BEFORE UPDATE ON user_progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_activity ON user_progress(last_activity_date);
CREATE INDEX IF NOT EXISTS idx_user_progress_streak ON user_progress(streak_days_count);

-- Function to reset daily progress
CREATE OR REPLACE FUNCTION reset_daily_progress()
RETURNS void AS $$
BEGIN
  UPDATE user_progress 
  SET 
    learning_minutes_today = 0,
    last_activity_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE last_activity_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to reset daily progress (requires pg_cron extension)
-- SELECT cron.schedule('reset-daily-progress', '0 0 * * *', 'SELECT reset_daily_progress();');