
import React, { useState } from 'react';
import { Task, getPriorityColor, getPriorityBorderColor } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<{ task: Task; onComplete: (id: string) => void }> = ({ task, onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const softColor = getPriorityColor(task.priority);
  const accentColor = getPriorityBorderColor(task.priority);

  const handleComplete = () => {
    setIsExiting(true);
    // We wait for the animation to finish before removing from the state
    // The total duration is 600ms to allow for the slide and collapse
    setTimeout(() => {
      onComplete(task.id);
    }, 600);
  };

  return (
    <div 
      className={`relative group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isExiting 
          ? 'opacity-0 translate-x-12 blur-sm max-h-0 py-0 my-0' 
          : 'opacity-100 max-h-40 py-6'
      }`}
    >
      <div className="relative bg-white rounded-xl p-6 border border-slate-50/50 hover:border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-6 transition-shadow duration-300">
        {/* Subtle Priority Indicator Bar */}
        <div 
          className="absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-r-full transition-all duration-500"
          style={{ backgroundColor: softColor }}
        />

        <button
          onClick={handleComplete}
          className="relative w-5 h-5 rounded-full border border-slate-200 transition-all duration-300 flex items-center justify-center shrink-0 group-hover:border-slate-400 active:scale-90"
        >
          <div className="w-2 h-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" 
               style={{ backgroundColor: accentColor }} />
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-normal text-slate-700 group-hover:text-black transition-colors leading-tight">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-400 font-light mt-1.5 line-clamp-1">
              {task.description}
            </p>
          )}
        </div>

        <div className="shrink-0 flex items-center gap-4">
          <div 
            className="w-1.5 h-1.5 rounded-full opacity-40" 
            style={{ backgroundColor: softColor }}
          />
          <button 
            onClick={handleComplete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2 text-slate-200 hover:text-emerald-400"
            title="Complete task"
          >
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
