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
            <div className="loc-hero">
                {/* Note: In real app, images handles by asset bundling or public URL. 
            For now, using relative path assuming assets are in /public */}
                <img src={`/${location.poster_url}`} alt={`${location.title} Poster`} loading="lazy" />
                <div className="loc-caption">
                    <span className="loc-sub">Location 0{location.display_order} • Experience</span>
                    <h3>{location.title}</h3>
                </div>
            </div>
            <div className="container">
                <p className="poster-note">
                    {location.story}
                </p>
                <span className="scan-hint">SCAN QR AT THIS LOCATION FOR AUDIO</span>

                <div style={{ marginTop: '2rem' }}>
                    <Link to="/locations" className="btn">Back to Map</Link>
                </div>
            </div>
        </article>
    );
}
