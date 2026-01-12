import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCreateStations } from '../services/data';
import CommunitySubmission from './CommunitySubmission';

export default function StationDetail() {
    const { slug } = useParams();
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCreateStations().then((data) => {
            const found = data.find((s) => s.slug === slug);
            setStation(found);
            setLoading(false);
        });
    }, [slug]);

    if (loading) return <div className="container" style={{ paddingTop: '4rem' }}>Loading...</div>;
    if (!station) return <div className="container" style={{ paddingTop: '4rem' }}>Station not found. <Link to="/stations">Back to Stations</Link></div>;

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            {/* Station Poster Map Section */}
            <div className="loc-module">
                <div className="loc-hero">
                    <img src={`/${station.map_visual_url || station.poster_url}`} alt={`${station.title} Map`} />
                    <div className="loc-caption">
                        <span className="loc-sub">Station Poster Map</span>
                        <h3>{station.title}</h3>
                    </div>
                </div>
                <div className="poster-note">
                    <p style={{ marginBottom: 0 }}><strong>Where am I?</strong> {station.title}. Use this image to orient yourself in the physical space.</p>
                </div>
            </div>

            <div className="card">
                <span className="subtitle">Overview</span>
                <h1>{station.title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--caat-white)' }}>{station.story}</p>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--caat-gold)' }}>
                    "{station.description}"
                </p>
                {station.qr_instruction && (
                    <div className="scan-hint" style={{ marginTop: '1rem', border: '1px solid var(--caat-white)', color: 'var(--caat-white)', padding: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <strong>SCAN ACTION:</strong> {station.qr_instruction}
                    </div>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {station.youtube_url && (
                        <a href={station.youtube_url} target="_blank" rel="noopener noreferrer" className="btn">
                            Watch Video Lesson
                        </a>
                    )}
                    <Link to="/stations" className="btn" style={{ background: 'transparent', border: '1px solid var(--caat-gold)', color: 'var(--caat-gold)' }}>
                        All Stations
                    </Link>
                </div>
            </div>

            {/* Experience Visuals Section */}
            {station.experience_visual_urls && station.experience_visual_urls.length > 0 && (
                <div className="loc-module" style={{ marginTop: '4rem' }}>
                    <div className="loc-caption" style={{ position: 'relative', background: 'transparent', paddingLeft: 0, marginBottom: '1rem' }}>
                        <span className="loc-sub">Station Experience</span>
                        <h3>What Happens Here</h3>
                    </div>

                    <div className="station-grid" style={{ marginTop: '1rem' }}>
                        {station.experience_visual_urls.map((url, index) => (
                            <div key={index} className="station-card" style={{ minHeight: 'auto' }}>
                                <div className="station-poster">
                                    <img src={`/${url}`} alt="Experience Visual" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <CommunitySubmission stationId={station.id} stationTitle={station.title} />
        </div>
    );
}
