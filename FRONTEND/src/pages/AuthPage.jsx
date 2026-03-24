import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, Lock, Github, User } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

// A simple Google G icon replacement
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';
        const body = isLogin ? { email, password } : { name, email, password };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
        }
        
        navigate({ to: '/dashboard' });
      } catch (err) {
        setError(err.message);
      }
    };

    return (
        <div style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                    URL <span className="text-gradient">SHORTENER</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3rem', fontWeight: 600 }}>
                    Precision data compression & routing
                </p>

                <div className="glass" style={{ width: '100%', padding: '2.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Tabs */}
                    <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.25rem' }}>
                        <button 
                            onClick={() => setIsLogin(true)}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: isLogin ? 'rgba(255,255,255,0.1)' : 'transparent', color: isLogin ? 'white' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            LOGIN
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)}
                            style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: !isLogin ? 'rgba(255,255,255,0.1)' : 'transparent', color: !isLogin ? 'white' : 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            SIGNUP
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {error && (
                            <div style={{ color: '#ff4d4d', fontSize: '0.8rem', textAlign: 'center', background: 'rgba(255, 0, 0, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
                                {error}
                            </div>
                        )}

                        {/* Name (Signup only) */}
                        {!isLogin && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d4edd', letterSpacing: '1px' }}>DESIGNATION (NAME)</label>
                                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required={!isLogin}
                                        className="input-glow"
                                        style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', outline: 'none' }}
                                    />
                                    <User color="var(--text-secondary)" size={18} />
                                </div>
                            </div>
                        )}
                        
                        {/* Email */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d4edd', letterSpacing: '1px' }}>IDENTITY ACCESS</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                                <input 
                                    type="email" 
                                    placeholder="email@url.shortener"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="input-glow"
                                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', outline: 'none' }}
                                />
                                <AtSign color="var(--text-secondary)" size={18} />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d4edd', letterSpacing: '1px' }}>CODED KEY</label>
                                {isLogin && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>FORGOT?</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                                <input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="input-glow"
                                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', outline: 'none', letterSpacing: '4px' }}
                                />
                                <Lock color="var(--text-secondary)" size={18} />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', letterSpacing: '1px' }}>
                            {isLogin ? 'INITIALIZE SESSION' : 'CREATE CONDUIT'}
                        </button>
                    </form>

                    <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.05)', zIndex: 1 }}></div>
                        <span style={{ position: 'relative', zIndex: 2, background: 'var(--bg-panel)', padding: '0 1rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '2px' }}>THIRD PARTY UPLINK</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}>
                            <GoogleIcon /> GOOGLE
                        </button>
                        <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}>
                            <Github size={18} color="#f0f6fc" /> GITHUB
                        </button>
                    </div>

                </div>

                <p style={{ marginTop: '3rem', fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '3px', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase' }}>
                    END-TO-END ENCRYPTION ENABLED • <br/> V4.2.0-STABLE
                </p>
            </motion.div>
        </div>
    );
};

export default AuthPage;