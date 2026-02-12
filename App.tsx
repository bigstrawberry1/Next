
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('zentask_data');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('zentask_data', JSON.stringify(tasks));
    }
  }, [tasks, isReady]);

  const handleOpen = () => {
    setIsClosing(false);
    setIsInputOpen(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsInputOpen(false);
      setIsClosing(false);
    }, 400); // Matches the duration in index.html
  };

  const addTask = (title: string, description: string, priority: number) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
    handleClose();
  };

  const completeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-slate-900 flex flex-col items-center pt-20 pb-32 px-6 sm:px-0">
      <div className="w-full max-w-xl space-y-16">
        <Header count={tasks.length} onAdd={handleOpen} />
        
        <div className="space-y-2">
          <TaskList tasks={sortedTasks} onComplete={completeTask} />
        </div>
      </div>

      {/* Task Input Modal */}
      {isInputOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
          <div 
            className={`absolute inset-0 bg-slate-100/40 backdrop-blur-md ${isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`}
            onClick={handleClose}
          />
          <div className={`relative w-full max-w-lg bg-white rounded-[2.5rem] p-12 shadow-[0_30px_80px_rgba(0,0,0,0.03)] border border-slate-100 ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
            <TaskInput 
              onAdd={addTask} 
              onCancel={handleClose}
            />
          </div>
        </div>
      )}
      
      <footer className="mt-auto pt-20 pb-12 text-[9px] text-slate-300 text-center font-medium uppercase tracking-[0.4em]">
        Less is more
      </footer>
    </div>
  );
};

export default App;
