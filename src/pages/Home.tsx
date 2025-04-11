import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Search, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Globe, 
  BookCheck, 
  Rocket 
} from 'lucide-react';
import type { FAQ, Service, AboutInfo } from '../types';
import db from '../db.json';

// Note: Changed Globe2 to Globe as it's the correct import name
const icons = {
  BookOpen,
  Users,
  GraduationCap,
  Globe,
  BookCheck,
  Rocket
};

type IconName = keyof typeof icons;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Home = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [about, setAbout] = useState<AboutInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentAboutIndex, setCurrentAboutIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setFaqs(db.faqs);
      setServices(db.services);
      setAbout(db.about);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutIndex((prev) => (prev + 1) % about.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [about.length]);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (event: any, info: any) => {
    const swipe = info.offset.x;
    const threshold = 50;

    if (Math.abs(swipe) > threshold) {
      if (swipe > 0) {
        setCurrentAboutIndex((prev) => (prev - 1 + about.length) % about.length);
      } else {
        setCurrentAboutIndex((prev) => (prev + 1) % about.length);
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to {import.meta.env.VITE_INSTITUTION_NAME}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover excellence in Arabic language and Islamic studies
            </p>
            <Link
              to="/ask"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Comprehensive programs tailored to your learning journey
            </p>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => {
              const IconComponent = icons[service.icon as IconName];
              return (
                <motion.div
                  key={service.id}
                  variants={item}
                  className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4">
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
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

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
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
                  variants={item}
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
          </motion.div>
        </div>
      </section>

      {/* About Section with Swipeable Cards */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Learn more about our institution and what drives us
            </p>
          </motion.div>
          
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentAboutIndex}
                className="absolute w-full"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
              >
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg max-w-2xl mx-auto">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {about[currentAboutIndex]?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {about[currentAboutIndex]?.content}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {about.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentAboutIndex
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentAboutIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the perfect blend of traditional wisdom and modern learning
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-6 w-6" />,
                title: "Comprehensive Curriculum",
                description: "Structured learning paths from beginner to advanced levels"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Expert Instructors",
                description: "Learn from qualified scholars and experienced teachers"
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Global Community",
                description: "Connect with students from around the world"
              },
              {
                icon: <BookCheck className="h-6 w-6" />,
                title: "Flexible Learning",
                description: "Choose from online, offline, or hybrid programs"
              },
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Certified Programs",
                description: "Earn recognized certificates and qualifications"
              },
              {
                icon: <Rocket className="h-6 w-6" />,
                title: "Rapid Progress",
                description: "Achieve your learning goals with our proven methodology"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};