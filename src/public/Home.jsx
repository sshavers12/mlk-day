import React from 'react';
import { Link } from 'react-router-dom';
import { locations } from '../config/content';

export default function Home() {
    return (
        <>
            <header className="container" style={{ paddingTop: '4rem' }}>
                <span className="subtitle">Chester Cultural Arts & Technology Center</span>
                <h1>Reclaiming the <span style={{ color: 'var(--caat-yellow)' }}>Dream</span></h1>
                <p style={{ marginTop: '1rem', borderLeft: '2px solid #333', paddingLeft: '1rem' }}>
                    Dr. Martin Luther King Jr. • Chester, Pennsylvania<br />
                    A living civic curriculum and digital archive.
                </p>
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
