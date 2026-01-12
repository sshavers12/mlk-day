import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCreateStations } from '../services/data';

export default function Stations() {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        getCreateStations().then(setStations);
    }, []);

    return (
        <div className="container">
            <section id="latham-hall">
                <h2>Latham Hall: The 5 Stations</h2>
                <p>
                    Each station has a poster image and a video lesson.
                </p>

                <div className="station-grid">
                    {stations.map((station) => (
                        <div className="station-card" key={station.slug}>
                            <Link to={`/station/${station.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div className="station-poster">
                                    <img src={`/${station.poster_url}`} alt={`${station.title} Poster`} loading="lazy" />
                                </div>
                                <div className="station-body">
                                    <h4 className="station-title">{station.title}</h4>
                                    <p className="station-desc">{station.description}</p>
                                </div>
                                <div className="station-actions" style={{ marginTop: 'auto', padding: '0 1rem 1.25rem 1rem' }}>
                                    <span className="btn">
                                        Enter Station <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
