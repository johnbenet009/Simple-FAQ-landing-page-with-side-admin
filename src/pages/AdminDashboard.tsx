import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, BookOpen, Users, GraduationCap, Globe, BookCheck, Rocket } from 'lucide-react';
import type { FAQ, Service, AboutInfo } from '../types';
import db from '../db.json';

const icons = {
  BookOpen,
  Users,
  GraduationCap,
  Globe,
  BookCheck,
  Rocket
};

type IconName = keyof typeof icons;

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'faqs' | 'services' | 'about'>('faqs');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [about, setAbout] = useState<AboutInfo[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingAbout, setEditingAbout] = useState<AboutInfo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/setup');
      return;
    }
    setFaqs(db.faqs);
    setServices(db.services);
    setAbout(db.about);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/setup');
  };

  const handleSaveFaq = async (faq: FAQ) => {
    if (editingFaq) {
      setFaqs(faqs.map(f => f.id === faq.id ? faq : f));
    } else {
      setFaqs([...faqs, { ...faq, id: String(Date.now()) }]);
    }
    setShowForm(false);
    setEditingFaq(null);
  };

  const handleSaveService = async (service: Service) => {
    if (editingService) {
      setServices(services.map(s => s.id === service.id ? service : s));
    } else {
      setServices([...services, { ...service, id: String(Date.now()) }]);
    }
    setShowForm(false);
    setEditingService(null);
  };

  const handleSaveAbout = async (about: AboutInfo) => {
    if (editingAbout) {
      setAbout(prev => prev.map(a => a.id === about.id ? about : a));
    } else {
      setAbout(prev => [...prev, { ...about, id: String(Date.now()) }]);
    }
    setShowForm(false);
    setEditingAbout(null);
  };

  const handleDelete = async (id: string, type: 'faq' | 'service' | 'about') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      switch (type) {
        case 'faq':
          setFaqs(faqs.filter(f => f.id !== id));
          break;
        case 'service':
          setServices(services.filter(s => s.id !== id));
          break;
        case 'about':
          setAbout(about.filter(a => a.id !== id));
          break;
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setEditingFaq(null);
              setEditingService(null);
              setEditingAbout(null);
              setShowForm(true);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {(['faqs', 'services', 'about'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {showForm && (
        <>
          {activeTab === 'faqs' && (
            <FaqForm
              faq={editingFaq}
              onSave={handleSaveFaq}
              onCancel={() => {
                setShowForm(false);
                setEditingFaq(null);
              }}
            />
          )}
          {activeTab === 'services' && (
            <ServiceForm
              service={editingService}
              onSave={handleSaveService}
              onCancel={() => {
                setShowForm(false);
                setEditingService(null);
              }}
            />
          )}
          {activeTab === 'about' && (
            <AboutForm
              about={editingAbout}
              onSave={handleSaveAbout}
              onCancel={() => {
                setShowForm(false);
                setEditingAbout(null);
              }}
            />
          )}
        </>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {activeTab === 'faqs' && (
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
                      onClick={() => handleDelete(faq.id, 'faq')}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}

        {activeTab === 'services' && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {services.map((service) => {
              const IconComponent = icons[service.icon as IconName];
              return (
                <motion.li
                  key={service.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                        {IconComponent && <IconComponent className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setShowForm(true);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, 'service')}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}

        {activeTab === 'about' && (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {about.map((info) => (
              <motion.li
                key={info.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {info.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {info.content}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingAbout(info);
                        setShowForm(true);
                      }}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(info.id, 'about')}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
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

interface ServiceFormProps {
  service: Service | null;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Service>>(
    service || {
      title: '',
      description: '',
      icon: 'BookOpen',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: service?.id || String(Date.now()),
      ...formData as Service,
      createdAt: service?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Icon
          </label>
          <select
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          >
            {Object.keys(icons).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
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
            {service ? 'Update' : 'Create'} Service
          </button>
        </div>
      </div>
    </form>
  );
};

interface AboutFormProps {
  about: AboutInfo | null;
  onSave: (about: AboutInfo) => void;
  onCancel: () => void;
}

const AboutForm: React.FC<AboutFormProps> = ({ about, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<AboutInfo>>(
    about || {
      title: '',
      content: '',
      order: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: about?.id || String(Date.now()),
      ...formData as AboutInfo,
      createdAt: about?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            required
          />
        </div>
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Order
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
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
            {about ? 'Update' : 'Create'} About
          </button>
        </div>
      </div>
    </form>
  );
};