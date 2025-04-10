import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { FAQ } from '../types';
import db from '../db.json';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/setup');
      return;
    }
    setFaqs(db.faqs);
  }, [navigate]);

  const handleSave = async (faq: FAQ) => {
    if (editingFaq) {
      setFaqs(faqs.map(f => f.id === faq.id ? faq : f));
    } else {
      setFaqs([...faqs, { ...faq, id: String(Date.now()) }]);
    }
    setShowForm(false);
    setEditingFaq(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FAQ Management</h1>
        <button
          onClick={() => {
            setEditingFaq(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add FAQ
        </button>
      </div>

      {showForm && (
        <FaqForm
          faq={editingFaq}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingFaq(null);
          }}
        />
      )}

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq) => (
            <motion.li
              key={faq.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {faq.answer.substring(0, 150)}...
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface FaqFormProps {
  faq: FAQ | null;
  onSave: (faq: FAQ) => void;
  onCancel: () => void;
}

const FaqForm: React.FC<FaqFormProps> = ({ faq, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<FAQ>>(
    faq || {
      question: '',
      answer: '',
      category: 'general',
      relatedIds: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: faq?.id || String(Date.now()),
      ...formData as FAQ,
      createdAt: faq?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Question
          </label>
          <input
            type="text"
            id="question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Answer
          </label>
          <textarea
            id="answer"
            rows={6}
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            {faq ? 'Update' : 'Create'} FAQ
          </button>
        </div>
      </div>
    </form>
  );
};