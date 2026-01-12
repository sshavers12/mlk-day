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
            <div className="loc-hero" style={{ borderBottom: 'none' }}>
                <img src={`/${station.poster_url}`} alt={`${station.title} Poster`} />
            </div>

            <div className="card">
                <span className="subtitle">Station 0{station.display_order}</span>
                <h1>{station.title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--caat-white)' }}>{station.description}</p>

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

            <CommunitySubmission stationId={station.id} stationTitle={station.title} />
        </div>
    );
}
