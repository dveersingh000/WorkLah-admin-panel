import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden py-4">
        <Header />
        <main className="flex-1 overflow-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;