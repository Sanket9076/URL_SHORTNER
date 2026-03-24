import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBar';
import Background3D from './components/Background3D';

const RootLayout = () => {
  return (
    <>
      <Background3D />
      <div className="app-container" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;