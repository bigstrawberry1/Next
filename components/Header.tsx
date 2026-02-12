
import React from 'react';

interface HeaderProps {
  count: number;
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ count, onAdd }) => {
  return (
    <header className="space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-5xl font-serif font-light text-slate-900 tracking-tight">
          Next.
        </h1>
        <button 
          onClick={onAdd}
          className="group flex items-center justify-center w-10 h-10 -mr-2 transition-all duration-300 active:scale-90"
          aria-label="Add New"
        >
          <div className="relative flex items-center justify-center">
            {/* Minimalist thin Plus icon */}
            <div className="absolute w-[1px] h-5 bg-slate-300 group-hover:bg-slate-900 transition-colors duration-500" />
            <div className="absolute h-[1px] w-5 bg-slate-300 group-hover:bg-slate-900 transition-colors duration-500" />
          </div>
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 bg-slate-200" />
        <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.3em]">
          {count > 0 ? `${count} remaining` : 'Empty state'}
        </p>
      </div>
    </header>
  );
};

export default Header;
