import React from 'react';
import { Link } from 'react-router-dom';

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

                    <Link to="/loc/university-place-cafeteria" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card">
                            <h3>1. University Place Cafeteria</h3>
                            <p><strong>The Gathering.</strong> The starting point. Like the mass meetings of the civil rights era, we begin with community orientation.</p>
                        </div>
                    </Link>

                    <Link to="/loc/alumni-auditorium" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card">
                            <h3>2. Alumni Auditorium</h3>
                            <p><strong>The Threshold.</strong> We exit the comfort of the gathering and walk to the Auditorium. This is the space of confrontation and history.</p>
                        </div>
                    </Link>

                    <Link to="/loc/harris-commons" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card">
                            <h3>3. Harris Commons</h3>
                            <p><strong>The Processing.</strong> A necessary pause. After the weight of the Auditorium, we enter Harris Commons to breathe and process.</p>
                        </div>
                    </Link>

                    <Link to="/loc/latham-hall" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card">
                            <h3>4. Latham Hall</h3>
                            <p><strong>The Reflection.</strong> The core interactive zone. Here, we engage with the 5 Stations of Preparation.</p>
                        </div>
                    </Link>
                </section>
            </div>
        </>
    );
}
