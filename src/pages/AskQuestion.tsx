import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import db from '../db.json';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage: Message = { role: 'user', content: question };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${import.meta.env.VITE_GEMINI_MODEL}:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful assistant. Respond to the customer's question using the provided FAQ data.
                Customer Question: ${question}
                FAQ Data: ${JSON.stringify(db.faqs)}
                Previous Conversation: ${JSON.stringify(messages)}
                Instructions (personality): Be polite and friendly, Keep responses clear, concise, and informative, Use details from the FAQ to provide accurate answers`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.candidates[0].content.parts[0].text 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I could not generate a response. Please try again.' 
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Ask a Question
        </h1>

        <div className="mb-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Question
            </label>
            <textarea
              id="question"
              rows={4}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know?"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Thinking...
              </>
            ) : (
              <>
                <Send className="-ml-1 mr-2 h-5 w-5" />
                Submit Question
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};