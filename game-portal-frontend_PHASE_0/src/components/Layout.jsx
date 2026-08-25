import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginModal from './LoginModal';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content-container">
        <Outlet />
      </main>
      <Footer />
      <LoginModal />
    </div>
  );
}
