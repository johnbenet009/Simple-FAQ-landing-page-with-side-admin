import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">FAQ Center</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/ask" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Ask a Question
          </Link>
          <a
            href={import.meta.env.VITE_INSTITUTION_URL}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
};