import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../config/content';

export default function Home() {
    return (
        <>
            {/* NEW HERO SECTION */}
            <header style={{ position: 'relative', width: '100%', marginBottom: '4rem' }}>
                <div style={{ width: '100%', height: 'auto', maxHeight: '600px', overflow: 'hidden', position: 'relative' }}>
                    <img
                        src="assets/images/station_campus_poster_map_bw_1768202533396.png"
                        alt="Aerial Campus Map of MLK Experience Locations"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, #000 0%, transparent 100%)', height: '150px' }}></div>
                </div>

                <div className="container" style={{ position: 'relative', marginTop: '-80px', paddingBottom: '2rem', zIndex: 2, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 20%)' }}>
                    <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1rem' }}>
                        MLK Day of Service & Reflection — <span style={{ color: 'var(--caat-yellow)' }}>The Chester Experience</span>
                    </h1>
                    <h2 className="subtitle" style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '1.5rem', fontWeight: '400', maxWidth: '800px', textTransform: 'none', letterSpacing: 'normal' }}>
                        A Community Partnership Between Widener University and the Chester Cultural Arts & Technology Center (CAAT)
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '700px', marginBottom: '2rem' }}>
                        A self-guided, campus-wide experience grounded in verified history, reflection, and community contribution.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="#overview" className="btn">Explore the Experience</a>
                        <a href="#journey-map" className="btn" style={{ background: 'transparent', border: '1px solid #666', color: '#ccc' }}>View Exhibit Locations</a>
                    </div>
                </div>
            </header>

            <div className="container">
                <section id="overview">
                    <p><strong>This is not an event. It is a curriculum.</strong></p>
                    <p>Welcome to the digital companion for the 2026 MLK Day Civic Experience. This archive captures the local history that shaped a global leader, and invites you to participate in that continuing legacy.</p>
                    <p>Dr. King’s time in Chester was defined by preparation, academic rigor, and the crystallization of his philosophy of nonviolence. Today, we retrace those steps—physically and reflectively.</p>
                </section>

                <section id="journey-map">
                    <h2>Experience Flow</h2>
                    <p>The experience is a progression across four distinct locations on campus, each representing a stage of civic engagement.</p>

                    {locations.map((loc) => (
                        <Link key={loc.slug} to={`/loc/${loc.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="card">
                                <h3>{loc.display_order}. {loc.title}</h3>
                                <p><strong>{loc.story.split('.')[0]}.</strong> {loc.story.split('.').slice(1).join('.').trim()}</p>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </>
    );
}
