import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreateStations } from '../services/data';

export default function LathamStations() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCreateStations().then((data) => {
            // Data service returns lathamStations from config
            setStations(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '4rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '4rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <Link to="/loc/latham-hall" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Latham Hall</Link>
                <h1 style={{ marginTop: '1rem' }}>The 5 Stations of Preparation</h1>
                <p>Digital collection. Add one short line at any station to help create a community poem and song.</p>
            </header>

            <div className="station-list" style={{ display: 'grid', gap: '2rem' }}>
                {stations.map((station, index) => (
                    <div key={station.slug} className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #333' }}>
                        {/* 1) Station Poster Image */}
                        <div style={{ height: '250px', overflow: 'hidden', position: 'relative', background: '#222' }}>
                            <img
                                src={`/${station.poster_url}`}
                                alt={`${station.title} Poster`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback if image fails or is missing */}
                            <div style={{
                                display: 'none', // Hidden by default, shown by onError
                                position: 'absolute',
                                top: 0, left: 0, width: '100%', height: '100%',
                                alignItems: 'center', justifyContent: 'center',
                                background: '#333', color: '#666', flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{index + 1}</span>
                                <span>{station.title}</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(transparent, #000)', padding: '1rem' }}>
                                <h2 style={{ margin: 0, color: '#fff' }}>{station.title}</h2>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            {/* 2) One-line prompt */}
                            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--caat-yellow)', marginBottom: '1.5rem' }}>
                                "{station.prompt}"
                            </p>

                            {/* 3) "Submit Your Line" button */}
                            {station.form_url ? (
                                <a href={station.form_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                    Submit Your Line
                                </a>
                            ) : (
                                <button className="btn" disabled style={{ width: '100%', textAlign: 'center', opacity: 0.6, cursor: 'not-allowed', background: '#333' }}>
                                    Scan QR in room to respond
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Link to="/" className="btn" style={{ background: 'transparent', border: '1px solid #666', color: '#ccc' }}>Back to Home</Link>
            </div>
        </div>
    );
}
