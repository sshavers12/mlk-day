import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/global.css';

export default function PublicLayout() {
    const [showAssistant, setShowAssistant] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const exhibitGuideUrl = import.meta.env.VITE_EXHIBIT_GUIDE_URL || 'https://app-693118592482.us-west1.run.app';

    const toggleAssistant = () => setShowAssistant(!showAssistant);

    // Helper to determine active state (simple check)
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className="caat-sticky-nav">
                <div className="caat-nav-inner">
                    <Link to="/" className="caat-logo">CAAT MLK 2026</Link>

                    {/* Desktop Nav */}
                    <ul className="caat-nav-links">
                        <li><Link to="/" style={isActive('/') ? { color: 'var(--caat-yellow)' } : {}}>Overview</Link></li>
                        <li><a href="/#journey-map">Experience Flow</a></li>
                        {/* <li><Link to="/locations" style={isActive('/locations') ? { color: 'var(--caat-yellow)' } : {}}>Campus Locations</Link></li> */}
                        <li><Link to="/latham-stations" style={isActive('/latham-stations') ? { color: 'var(--caat-yellow)' } : {}}>Latham Stations</Link></li>
                        <li><Link to="/forms" style={isActive('/forms') ? { color: 'var(--caat-yellow)' } : {}}>Forms</Link></li>
                        <li><a href="https://forms.gle/EEU3tDzydM7CgzuGA" target="_blank" rel="noopener noreferrer">Community Voice</a></li>
                        <li className="desktop-only"><a href="#" onClick={(e) => { e.preventDefault(); toggleAssistant(); }}>Exhibit Guide</a></li>
                        {/* <li><Link to="/login" style={{ border: '1px solid #333', padding: '0.2rem 0.8rem', borderRadius: '4px' }}>Login</Link></li> */}
                    </ul>

                    {/* Mobile Hamburger */}
                    <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-nav-overlay ${showMobileMenu ? 'open' : ''}`}>
                <button className="mobile-menu-close" onClick={() => setShowMobileMenu(false)}>&times;</button>
                <nav className="mobile-nav-content">
                    <Link to="/" onClick={() => setShowMobileMenu(false)} style={isActive('/') ? { color: 'var(--caat-yellow)' } : {}}>Overview</Link>
                    <a href="/#journey-map" onClick={() => setShowMobileMenu(false)}>Experience Flow</a>
                    {/* <Link to="/locations" onClick={() => setShowMobileMenu(false)} style={isActive('/locations') ? { color: 'var(--caat-yellow)' } : {}}>Campus Locations</Link>  */}
                    <Link to="/latham-stations" onClick={() => setShowMobileMenu(false)} style={isActive('/latham-stations') ? { color: 'var(--caat-yellow)' } : {}}>Latham Stations</Link>
                    <Link to="/forms" onClick={() => setShowMobileMenu(false)} style={isActive('/forms') ? { color: 'var(--caat-yellow)' } : {}}>Forms</Link>
                    <a href="https://forms.gle/EEU3tDzydM7CgzuGA" target="_blank" rel="noopener noreferrer" onClick={() => setShowMobileMenu(false)}>Community Voice</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleAssistant(); setShowMobileMenu(false); }}>Exhibit Guide</a>
                    {/* <Link to="/login" onClick={() => setShowMobileMenu(false)} className="mobile-login-btn">Login</Link> */}
                </nav>
            </div>

            {/* Main Content Rendered Here */}
            <Outlet />

            <div className="container" style={{ marginTop: 'auto' }}>
                <div style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid #333' }}>
                    <p style={{ color: '#ccc', marginBottom: '1rem' }}>Ready to reflect? Open the forms.</p>
                    <Link to="/forms" className="btn">Go to Forms</Link>
                </div>
                <footer>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', color: '#666', fontSize: '.8rem', textAlign: 'center', paddingBottom: '2rem' }}>
                        <p><strong>Reclaiming the Dream • MLK 2026</strong></p>
                        <p>Produced by the Chester Cultural Arts & Technology Center (CAAT).</p>
                        <p>All historical content curated with respect for Dr. King's legacy.</p>
                    </div>
                </footer>
            </div>

            <button id="assistant-btn" onClick={toggleAssistant} style={{ display: showMobileMenu ? 'none' : 'block' }}>Exhibit Guide</button>

            <div
                id="assistant-panel"
                style={{ display: showAssistant ? 'flex' : 'none' }}
            >
                <div id="panel-header">
                    <span>MLK Archive Assistant</span>
                    <button id="panel-close" onClick={toggleAssistant}>&times;</button>
                </div>
                {showAssistant && (
                    <iframe
                        id="panel-iframe"
                        src={exhibitGuideUrl}
                        title="Exhibit Assistant"
                        allow="microphone; clipboard-write; clipboard-read;"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    ></iframe>
                )}
            </div>
        </>
    );
}
