import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Edit3, Plus } from 'lucide-react';
import { Journey, WeeklyTask } from './GoalMapper';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface WeeklyGoalsProps {
  journey: Journey;
  onTaskToggle: (taskId: string) => void;
  onSave: () => void;
}

export function WeeklyGoals({ journey, onTaskToggle, onSave }: WeeklyGoalsProps) {
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeks = Array.from({ length: 4 }, (_, i) => i + 1);
  const tasksForWeek = journey.weeklyTasks.filter(task => task.week === selectedWeek);
  const completedTasks = journey.weeklyTasks.filter(task => task.completed).length;
  const totalTasks = journey.weeklyTasks.length;
  const progressPercent = (completedTasks / totalTasks) * 100;

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      // In a real app, this would update the journey
      console.log('Adding task:', newTaskTitle, 'to week', selectedWeek);
      setNewTaskTitle('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-serif font-semibold text-gray-900 mb-2">
          Customize Your Plan
        </h2>
        <p className="text-gray-600">
          Adjust tasks to fit your schedule and preferences
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{completedTasks}/{totalTasks} tasks</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
          />
        </div>
      </Card>

      {/* Week Selector */}
      <div className="flex space-x-2">
        {weeks.map(week => {
          const weekTasks = journey.weeklyTasks.filter(t => t.week === week);
          const weekCompleted = weekTasks.filter(t => t.completed).length;
          const isSelected = selectedWeek === week;
          
          return (
            <motion.button
              key={week}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedWeek(week)}
              className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-primary-300 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              <div className="text-sm font-semibold text-gray-900">
                Week {week}
              </div>
              <div className="text-xs text-gray-600">
                {weekCompleted}/{weekTasks.length} done
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tasks for Selected Week */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Week {selectedWeek} Tasks
          </h3>
          <span className="text-sm text-gray-600">
            {tasksForWeek.length} tasks
          </span>
        </div>

        <div className="space-y-3">
          {tasksForWeek.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 transition-all ${
                task.completed ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
              }`}>
                <div className="flex items-start space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onTaskToggle(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </motion.button>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{task.estimatedMinutes} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingTask(task.id)}
                    className="text-gray-400 hover:text-primary-500 p-1"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Add New Task */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: tasksForWeek.length * 0.1 + 0.2 }}
          >
            <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-primary-300 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  placeholder="Add a custom task..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
                {newTaskTitle && (
                  <Button
                    onClick={handleAddTask}
                    size="sm"
                    className="px-3 py-1 text-xs"
                  >
                    Add
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-6"
      >
        <Button
          onClick={onSave}
          size="lg"
          className="w-full"
        >
          Save & Start Journey
        </Button>
      </motion.div>
    </motion.div>
  );
}