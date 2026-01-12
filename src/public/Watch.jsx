import React, { useEffect, useState } from 'react';
import { getCreateStations } from '../services/data';

export default function Watch() {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        getCreateStations().then(setStations);
    }, []);

    return (
        <div className="container">
            <section>
                <h2>Watch</h2>
                <p>Curated video lessons from Latham Hall Stations.</p>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    {stations.map(s => (
                        <div key={s.slug} className="card">
                            <h3>{s.title}</h3>
                            {s.youtube_url ? (
                                <a href={s.youtube_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--caat-gold)' }}>Watch Video &rarr;</a>
                            ) : (
                                <span style={{ color: 'var(--caat-gray)' }}>Coming Soon</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
