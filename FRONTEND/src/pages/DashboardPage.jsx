import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Code as CodeIcon, Globe, Copy, BarChart2, LayoutGrid, Clock, Settings, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';

const dataClicks = [
  { name: 'Mon', clicks: 200 },
  { name: 'Tue', clicks: 400 },
  { name: 'Wed', clicks: 300 },
  { name: 'Thu', clicks: 800 },
  { name: 'Fri', clicks: 600 },
  { name: 'Sat', clicks: 900 },
  { name: 'Sun', clicks: 1200 },
];

const dataLinks = [
  { name: 'M', value: 40 },
  { name: 'T', value: 60 },
  { name: 'W', value: 45 },
  { name: 'T', value: 80 },
  { name: 'F', value: 65 },
];

const StatCard = ({ title, value, icon: Icon, chart: ChartComponent, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass"
    style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', color: 'var(--text-secondary)' }}>{title}</span>
      <Icon size={16} color={color} />
    </div>
    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</div>
    {ChartComponent && (
      <div style={{ height: '40px', width: '100%', marginTop: 'auto' }}>
        {ChartComponent}
      </div>
    )}
  </motion.div>
);

const RecentActivityItem = ({ code, url, clicks }) => (
  <div className="glass" style={{ padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Zap size={20} color="var(--accent-cyan)" />
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>kinetic.io/{code}</span>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{url}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>CLICKS</span>
        <span style={{ fontWeight: 800 }}>{clicks}</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Copy size={14} />
        </button>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <BarChart2 size={14} />
        </button>
      </div>
    </div>
  </div>
);

const BottomNav = () => (
  <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(15, 17, 26, 0.9)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem 1rem 1.5rem', display: 'flex', justifyContent: 'center', zIndex: 50 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-purple)' }}>
        <LayoutGrid size={20} />
        <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>DASH</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
        <Clock size={20} />
        <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>HISTORY</span>
      </div>
      
      <div style={{ transform: 'translateY(-20px)', background: 'var(--accent-purple)', padding: '1rem', borderRadius: '16px', color: 'white', boxShadow: '0 8px 24px rgba(157,78,221,0.4)', cursor: 'pointer' }}>
        <Plus size={24} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
        <TrendingUp size={20} />
        <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>STATS</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
        <Settings size={20} />
        <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>TOOLS</span>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setShortUrl('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${API_URL}/api/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to shorten URL');
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>
            Compress your <span style={{ color: 'var(--accent-purple)' }}>reach.</span>
          </h1>
        </div>

        {/* Shortener Input */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', gap: '0.5rem' }}>
            <CodeIcon size={18} color="var(--text-secondary)" />
            <input 
              type="url" 
              placeholder="Paste your long URL here..." 
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="input-glow"
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
            />
          </div>
          <button 
            onClick={handleShorten}
            disabled={loading}
            style={{ width: '100%', padding: '1rem', background: 'var(--accent-purple)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'SHORTENING...' : 'SHORTEN'} <Zap size={16} />
          </button>
          
          {error && (
            <div style={{ marginTop: '1rem', color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', background: 'rgba(255, 0, 0, 0.1)', padding: '0.75rem', borderRadius: '8px' }}>
              {error}
            </div>
          )}
          
          {shortUrl && (
            <div style={{ marginTop: '1rem', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>YOUR SHORT URL</span>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}>
                  {shortUrl}
                </a>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: 'white' }}>
                <Copy size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <StatCard 
            title="TOTAL CLICKS" 
            value="12.4k" 
            icon={TrendingUp} 
            color="var(--accent-cyan)"
            delay={0.1}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataClicks}>
                  <Line type="monotone" dataKey="clicks" stroke="var(--accent-cyan)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            }
          />
          <StatCard 
            title="ACTIVE LINKS" 
            value="842" 
            icon={CodeIcon} 
            color="var(--accent-cyan)"
            delay={0.2}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataLinks}>
                  <Bar dataKey="value" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            }
          />
          <StatCard 
            title="GLOBAL REACH" 
            value={
              <span style={{ fontSize: '1.2rem' }}>Top Origin: London</span>
            } 
            icon={Globe} 
            color="transparent"
            delay={0.3}
          />
        </div>

        {/* Recent Activity */}
        <div style={{ paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '4px', height: '24px', background: 'var(--accent-purple)', borderRadius: '2px' }}></div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Recent Activity</h2>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-purple)', letterSpacing: '1px', cursor: 'pointer' }}>VIEW ALL</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <RecentActivityItem code="px7r" url="https://marketing.agency/cam..." clicks="1,248" />
            <RecentActivityItem code="z99v" url="https://github.com/kinetic-ethe..." clicks="312" />
            <RecentActivityItem code="l00w" url="https://dribbble.com/shots/23..." clicks="56" />
          </div>
        </div>

      </div>
      
      <BottomNav />
    </div>
  );
};

export default DashboardPage;