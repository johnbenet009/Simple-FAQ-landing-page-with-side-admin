import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';

export const Layout = () => {
  const location = useLocation();
  const showChatButton = location.pathname !== '/ask';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {showChatButton && <FloatingChatButton />}
      <Footer />
    </div>
  );
};