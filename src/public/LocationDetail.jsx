import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCreateLocations } from '../services/data';

export default function LocationDetail() {
    const { slug } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCreateLocations().then((data) => {
            const found = data.find((l) => l.slug === slug);
            setLocation(found);
            setLoading(false);
        });
    }, [slug]);

    if (loading) return <div className="container" style={{ paddingTop: '4rem' }}>Loading...</div>;
    if (!location) return <div className="container" style={{ paddingTop: '4rem' }}>Location not found. <Link to="/locations">Back to Locations</Link></div>;

    return (
        <article className="loc-module" style={{ scrollMarginTop: 'calc(var(--nav-height) + 20px)' }}>
            {/* 1) ONE poster/hero image */}
            <div className="loc-hero">
                <img src={`/${location.poster_url}`} alt={`${location.title} Poster`} loading="lazy" />
                <div className="loc-caption">
                    <span className="loc-sub">Location 0{location.display_order} • Experience</span>
                    <h3>{location.title}</h3>
                </div>
            </div>

            <div className="container">
                {/* 2) ONE short "What to Expect" description */}
                <div className="poster-note" style={{ marginTop: '2rem' }}>
                    <p><strong>What to Expect:</strong></p>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                        {location.description}
                    </p>
                </div>

                {/* 3) ONE “Curated Video” module */}
                {location.video_url ? (
                    <div className="video-module" style={{ margin: '3rem 0', borderRadius: '8px', overflow: 'hidden', background: '#000', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src={location.video_url}
                            title={`${location.title} Video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                ) : (
                    location.slug === 'latham-hall' || location.slug === 'university-place-cafeteria' ? null : (
                        <div className="video-module" style={{ margin: '3rem 0', padding: '2rem', border: '1px solid #333', borderRadius: '8px', textAlign: 'center', background: '#000' }}>
                            <p style={{ color: '#888', fontStyle: 'italic' }}>Curated video coming soon.</p>
                        </div>
                    )
                )}

                {/* 4) ONE “Add Your Reflection / Add Your Voice” input module */}
                {location.action_type !== 'none' && (
                    <div className="action-module" style={{ marginTop: '2rem', padding: '2rem', background: '#111', borderRadius: '8px', borderLeft: '4px solid var(--caat-yellow)' }}>
                        <h4 style={{ color: 'var(--caat-yellow)', marginTop: 0 }}>Add Your Voice</h4>

                        {location.action_type === 'link' ? (
                            <Link to={location.link_to} className="btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                {location.button_text}
                            </Link>
                        ) : (
                            location.form_url ? (
                                <a href={location.form_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                    Open Response Form
                                </a>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '1rem', border: '1px dashed #666' }}>
                                    <p style={{ margin: 0, fontSize: '1.1rem' }}>{location.qr_instruction || "Scan QR in room to respond"}</p>
                                </div>
                            )
                        )}
                    </div>
                )}

                <div style={{ marginTop: '4rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
                    <Link to="/" className="btn" style={{ background: 'transparent', border: '1px solid #666', color: '#ccc' }}>Back to Map</Link>
                </div>
            </div>
        </article>
    );
}
