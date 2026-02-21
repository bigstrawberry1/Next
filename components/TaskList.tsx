
import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-300 space-y-4">
        <div className="w-16 h-16 rounded-full border border-dashed border-slate-200 flex items-center justify-center">
          <i className="fa-solid fa-leaf text-2xl opacity-20"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
};

export default TaskList;
