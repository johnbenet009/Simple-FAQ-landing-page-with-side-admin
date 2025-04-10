import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import type { FAQ } from '../types';
import db from '../db.json';

export const Home = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFaqs(db.faqs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How can we help you?
        </h1>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <Link to={`/faq/${faq.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                  <span>Read more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};