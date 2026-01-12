import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreateLocations } from '../services/data';

export default function Locations() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getCreateLocations().then(setLocations);
    }, []);

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>Campus Locations</h2>
                <p style={{ margin: '0 auto' }}>Retrace the steps of preparation across the campus.</p>
            </header>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {locations.map((loc) => (
                    <Link to={`/loc/${loc.slug}`} key={loc.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
                            <h3>{loc.display_order}. {loc.title}</h3>
                            <p>{loc.story}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
