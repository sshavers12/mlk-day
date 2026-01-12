import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/global.css';

export default function PublicLayout() {
    const [showAssistant, setShowAssistant] = useState(false);
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
                    <ul className="caat-nav-links">
                        <li><Link to="/" style={isActive('/') ? { color: 'var(--caat-gold)' } : {}}>Overview</Link></li>
                        <li><a href="/#journey-map">Experience Flow</a></li>
                        <li><Link to="/locations" style={isActive('/locations') ? { color: 'var(--caat-gold)' } : {}}>Campus Locations</Link></li>
                        <li><Link to="/stations" style={isActive('/stations') ? { color: 'var(--caat-gold)' } : {}}>Latham Stations</Link></li>
                        <li><a href="/#community-voice">Community Voice</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); toggleAssistant(); }}>Exhibit Guide</a></li>
                        <li><Link to="/login" style={{ border: '1px solid #333', padding: '0.2rem 0.8rem', borderRadius: '4px' }}>Login</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Content Rendered Here */}
            <Outlet />

            <div className="container" style={{ marginTop: 'auto' }}>
                <footer>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', color: '#666', fontSize: '.8rem', textAlign: 'center', paddingBottom: '2rem' }}>
                        <p><strong>Reclaiming the Dream • MLK 2026</strong></p>
                        <p>Produced by the Chester Cultural Arts & Technology Center (CAAT).</p>
                        <p>All historical content curated with respect for Dr. King's legacy.</p>
                    </div>
                </footer>
            </div>

            <button id="assistant-btn" onClick={toggleAssistant}>Exhibit Guide</button>

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
                    ></iframe>
                )}
            </div>
        </>
    );
}
