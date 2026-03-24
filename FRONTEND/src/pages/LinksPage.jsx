import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, QrCode, Trash2, ArrowRight, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

const mockLinks = [
  {
    id: 1,
    code: 'px7r2',
    url: 'https://medium.com/engineering/the-futur...',
    date: 'OCT 12',
    trend: '+12%',
    isUp: true,
    clicks: '1,284',
    data: [
      { v: 10 }, { v: 12 }, { v: 8 }, { v: 15 }, { v: 11 }, { v: 18 }, { v: 10 }
    ]
  },
  {
    id: 2,
    code: 'v9z0k',
    url: 'https://github.com/kinetic-ether/core-api-...',
    date: 'OCT 08',
    trend: 'STABLE',
    isUp: null,
    clicks: '452',
    data: [
      { v: 5 }, { v: 5 }, { v: 5 }, { v: 6 }, { v: 6 }, { v: 7 }, { v: 6 }
    ]
  },
  {
    id: 3,
    code: 'beta_test',
    url: 'https://staging.app.kinetic-ether.com/onb...',
    date: 'SEP 30',
    trend: '-4%',
    isUp: false,
    clicks: '3,910',
    data: [
      { v: 25 }, { v: 22 }, { v: 20 }, { v: 18 }, { v: 15 }, { v: 12 }, { v: 10 }
    ]
  }
];

const LinkCard = ({ it, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass"
    style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'rgba(22, 24, 35, 0.9)' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>kinetic.io/{it.code}</span>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2px', borderRadius: '4px' }}>
            <Filter size={12} color="var(--text-secondary)" />
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{it.url}</span>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>
      <span style={{ color: 'var(--text-secondary)' }}>CREATED {it.date}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: it.isUp === true ? '#00f0ff' : it.isUp === false ? '#ff4d4d' : 'var(--text-secondary)' }}>
        {it.isUp === true && <TrendingUp size={12} />}
        {it.isUp === false && <TrendingDown size={12} />}
        {it.isUp === null && <ArrowRight size={12} />}
        {it.trend} {it.isUp !== null && 'THIS WEEK'}
      </span>
    </div>

    <div style={{ height: '50px', width: '100%', margin: '1rem 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={it.data}>
          <Bar dataKey="v" radius={[2, 2, 0, 0]}>
            {it.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 5 ? 'var(--accent-cyan)' : 'rgba(0, 240, 255, 0.3)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>{it.clicks}</span>
        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '1px', color: 'var(--text-secondary)' }}>TOTAL CLICKS</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <QrCode size={16} />
        </button>
        <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

const LinksPage = () => {
  const [search, setSearch] = useState('');

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1rem 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Header */}
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', letterSpacing: '-1px' }}>
            Link <br /><span style={{ color: 'var(--accent-purple)' }}>Ecosystem</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Manage your high-velocity data conduits and track real-time click kinetics.
          </p>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search conduits by keyword or URL..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-glow"
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', marginLeft: '0.5rem', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontWeight: 700, fontSize: '0.8rem' }}>
              <Filter size={14} /> SORT
            </button>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-purple)', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '0.8rem' }}>
              <Plus size={14} /> NEW LINK
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {mockLinks.map((link, i) => (
            <LinkCard key={link.id} it={link} delay={i * 0.1} />
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '1px' }}>SHOWING 3 OF <br/> 124 CONDUITS</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="glass" style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'var(--text-secondary)' }}><ChevronLeft size={16}/></button>
            <button className="glass" style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-purple)', color: 'white', fontWeight: 700 }}>1</button>
            <button className="glass" style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'var(--text-secondary)', fontWeight: 700 }}>2</button>
            <button className="glass" style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'var(--text-secondary)', fontWeight: 700 }}>3</button>
            <button className="glass" style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: 'var(--text-secondary)' }}><ChevronRight size={16}/></button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LinksPage;
