import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Activity, Shield, Code, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="glass"
    style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '16px' }}
  >
    <div style={{ background: 'rgba(157, 78, 221, 0.1)', padding: '1rem', borderRadius: '12px', width: 'fit-content' }}>
      <Icon color="#9d4edd" size={28} />
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{description}</p>
  </motion.div>
);

const Testimonial = ({ name, role, text, img, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="glass"
    style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
  >
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00f0ff" color="#00f0ff" />)}
    </div>
    <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>"{text}"</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2a2d3e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        {img || name[0]}
      </div>
      <div>
        <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{name}</h4>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{role}</span>
      </div>
    </div>
  </motion.div>
);

const HomePage = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (url) {
      // Typically we'd call API, here we just navigate or show success
      navigate({ to: '/dashboard' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', width: '100%', maxWidth: '800px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}
        >
          <h1 style={{ margin: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <span className="text-3d-animated" style={{ fontSize: '4.5rem' }}>URL</span>
            <span className="text-3d-animated" style={{ fontSize: '3.5rem', animationDelay: '0.2s', animationDuration: '4.5s' }}>SHORTENER</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem 0 2.5rem' }}>
            Precision data compression for high-velocity digital entities. Shorten your reach with zero latency.
          </p>

          <form onSubmit={handleShorten} className="glass" style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', padding: '0.5rem', gap: '0.5rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <LinkIcon color="var(--text-secondary)" size={20} />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your massive URL..."
                required
                className="input-glow"
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0.8rem', fontSize: '1rem' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '1.2rem', borderRadius: '12px', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              ACCELERATE
            </button>
          </form>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', opacity: 0.6 }}>
            {/* Some decorative elements imitating logos or trusted by */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity /> <span style={{ fontWeight: 600 }}>FAST</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield /> <span style={{ fontWeight: 600 }}>SECURE</span></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', width: '100%', maxWidth: '1000px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>ENGINEERED FOR <br/><span className="text-gradient">SCALE</span></h2>
          <div style={{ width: '60px', height: '4px', background: 'var(--accent-purple)', marginTop: '1rem', borderRadius: '2px' }}></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <FeatureCard 
            icon={Activity} 
            title="Ultra-Latency Infrastructure" 
            description="Built on the blazingly fast global edge network. First byte resolves in milliseconds, no matter where traffic originates."
            delay={0.1}
          />
          <FeatureCard 
            icon={Activity} 
            title="Real-time Pulse" 
            description="Every click tracked instantly and visualized with 3D data telemetry."
            delay={0.2}
          />
          <FeatureCard 
            icon={Shield} 
            title="Encrypted Transit" 
            description="Enterprise-grade routing ensures your data remains immutable and secure."
            delay={0.3}
          />
          <FeatureCard 
            icon={Code} 
            title="API First Architecture" 
            description="Integrate Kinetic Ether into your existing CI/CD pipelines with our robust REST API."
            delay={0.4}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '4rem 2rem', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>FEEDBACK LOOP</p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 3rem 0', textAlign: 'center' }}>Developer Choice</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          <Testimonial 
            name="Marcus Chen" 
            role="Lead Architect, SynSystems" 
            text="The API is a breath of fresh air. It's not just a tool, it's a precision instrument. Kinetic has replaced all our internal link management."
            delay={0.1}
          />
          <Testimonial 
            name="Elena Rodriguez" 
            role="Director of DevOps, Blue Ocean" 
            text="Routing 1M requests a minute with zero drop. The analytics dashboard is provided exactly the telemetry we needed."
            delay={0.2}
          />
          <Testimonial 
            name="James Wilson" 
            role="CTO, ScaleTech" 
            text="Flawless integration. We've read the docs, the documentation is pristine and the API response times are unmatched."
            delay={0.3}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 2rem 4rem', width: '100%', maxWidth: '600px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>READY TO <br/><span className="text-gradient">SHORTEN?</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.6 }}>
          Join 50,000+ developers compressing the web. Get started with no credit card required.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '350px' }}>
          <button className="btn-primary" style={{ padding: '1.2rem', borderRadius: '12px', fontSize: '1rem' }}>
            GET STARTED FREE
          </button>
          <button className="glass" style={{ padding: '1.2rem', borderRadius: '12px', fontSize: '1rem', color: 'white', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', cursor: 'pointer' }}>
            VIEW DOCUMENTATION
          </button>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer style={{ marginTop: 'auto', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', width: '100%' }}>
        <h3 style={{ margin: 0, fontWeight: 800, letterSpacing: '2px', fontSize: '1rem', color: 'var(--accent-purple)' }}>URL SHORTENER</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>© 2024 URL SHORTENER. PRECISION DATA COMPRESSION.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600 }}>
          <span style={{ cursor: 'pointer' }}>DOCUMENTATION</span>
          <span style={{ cursor: 'pointer' }}>STATUS</span>
          <span style={{ cursor: 'pointer' }}>TERMS</span>
          <span style={{ cursor: 'pointer' }}>API</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;