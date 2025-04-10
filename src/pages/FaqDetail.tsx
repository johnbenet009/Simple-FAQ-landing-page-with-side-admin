import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import type { FAQ } from '../types';
import db from '../db.json';

export const FaqDetail = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [relatedFaqs, setRelatedFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const currentFaq = db.faqs.find(f => f.id === id);
      if (currentFaq) {
        setFaq(currentFaq);
        setRelatedFaqs(
          db.faqs.filter(f => currentFaq.relatedIds.includes(f.id))
        );
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">FAQ not found</h1>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
          Return to FAQ list
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{faq.question}</h1>
      <div className="prose dark:prose-invert max-w-none mb-12">
        <ReactMarkdown>{faq.answer}</ReactMarkdown>
      </div>

      {relatedFaqs.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Related Questions
          </h2>
          <div className="space-y-4">
            {relatedFaqs.map((relatedFaq) => (
              <Link
                key={relatedFaq.id}
                to={`/faq/${relatedFaq.id}`}
                className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {relatedFaq.question}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};