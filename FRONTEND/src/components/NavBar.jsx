import React from 'react';
import { Link } from '@tanstack/react-router';
import { Zap, User } from 'lucide-react';

const Navbar = () => {
  // Temporary mock auth state for UI purposes
  const isAuthenticated = false;

  return (
    <nav style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(15, 17, 26, 0.5)', backdropFilter: 'blur(10px)' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
        <Zap color="#9d4edd" size={28} style={{ fill: '#9d4edd' }}/>
        <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '2px' }}>URL SHORTENER</span>
      </Link>

      <div>
        {isAuthenticated ? (
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', color: 'white', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px' }}>
            <span>DASHBOARD</span>
            <User size={18} />
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/auth" style={{ color: '#a0a5ba', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px' }}>LOGIN</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;