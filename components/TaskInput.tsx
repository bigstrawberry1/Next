
import React, { useState, useEffect, useRef } from 'react';
import { getPriorityColor } from '../types';

interface TaskInputProps {
  onAdd: (title: string, description: string, priority: number) => void;
  onCancel: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(20);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description, priority);
    setTitle('');
    setDescription('');
    setPriority(20);
  };

  const currentColor = getPriorityColor(priority);

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-8">
        <div className="space-y-2 group">
          <label className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.4em] group-focus-within:text-slate-500 transition-colors">
            The Goal
          </label>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Focus on..."
            className="w-full text-4xl font-light placeholder:text-slate-300 border-none outline-none ring-0 focus:outline-none focus:ring-0 text-slate-800 bg-transparent py-2 px-0 transition-all duration-500"
            autoComplete="off"
          />
        </div>
        
        <div className="space-y-2 group">
          <label className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.4em] group-focus-within:text-slate-500 transition-colors">
            The Detail
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some nuance (optional)"
            className="w-full text-base text-slate-500 placeholder:text-slate-300 border-none outline-none ring-0 focus:outline-none focus:ring-0 bg-transparent py-2 px-0 min-h-[100px] resize-none font-light leading-relaxed transition-all duration-500"
          />
        </div>
      </div>

      <div className="space-y-8 pt-10">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.4em]">
              Intensity
            </label>
            <div 
              className="w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-sm"
              style={{ backgroundColor: currentColor }}
            />
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="w-full h-[1px] bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-400 hover:accent-slate-500 transition-all focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-[0.4em] font-medium outline-none focus:outline-none"
          >
            Go back
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-12 py-4 bg-slate-800 text-white rounded-full text-[10px] font-medium tracking-[0.25em] uppercase hover:bg-black disabled:bg-slate-50 disabled:text-slate-200 transition-all duration-700 shadow-sm disabled:shadow-none outline-none focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
