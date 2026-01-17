import React from 'react';
import { Link } from 'react-router-dom';

const formsData = [
    {
        title: 'Alumni Auditorium Reflection – The Threshold',
        url: 'https://forms.gle/h9mDQD6VmSKXudCy8',
        qr_png: 'assets/qr/forms/alumni_hall_reflection_the_threshold.png',
        qr_svg: 'assets/qr/forms/alumni_hall_reflection_the_threshold.svg'
    },
    {
        title: 'Harris Commons Reflection – I Belong Here',
        url: 'https://forms.gle/AZkjHyJomud5kSWB9',
        qr_png: 'assets/qr/forms/harris_hall_reflection_i_belong_here.png',
        qr_svg: 'assets/qr/forms/harris_hall_reflection_i_belong_here.svg'
    },
    {
        title: 'Latham Hall Reflection (General)',
        url: 'https://forms.gle/RovCjyBRKCiAzsus5', // Using general link
        qr_png: 'assets/qr/forms/lathem_hall_contributions_beloved_community.png',
        qr_svg: 'assets/qr/forms/lathem_hall_contributions_beloved_community.svg'
    },
    {
        title: 'Latham Station — Belief',
        url: 'https://forms.gle/4qUPwmwY72iuqDiF8',
        qr_png: 'assets/qr/forms/lathem_hall_station_belief_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_belief_mlk_2026.svg'
    },
    {
        title: 'Latham Station — Listening',
        url: 'https://forms.gle/QXui3Unys5rZQ2RV8',
        qr_png: 'assets/qr/forms/lathem_hall_station_listening_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_listening_mlk_2026.svg'
    },
    {
        title: 'Latham Station — Courage',
        url: 'https://forms.gle/wWNAwXVegBir5Ags5',
        qr_png: 'assets/qr/forms/lathem_hall_station_courage_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_courage_mlk_2026.svg'
    },
    {
        title: 'Latham Station — Identity',
        url: 'https://forms.gle/z8UGRukU9v9mgH1s7',
        qr_png: 'assets/qr/forms/lathem_hall_station_identity_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_identity_mlk_2026.svg'
    },
    {
        title: 'Latham Station — Preparation',
        url: 'https://forms.gle/6x8UYfP2j9BLyLTQ6',
        qr_png: 'assets/qr/forms/lathem_hall_station_preparation_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_preparation_mlk_2026.svg'
    }
];

export default function Forms() {
    return (
        <div className="container" style={{ paddingTop: '4rem' }}>
            <header style={{ marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '2rem' }}>
                <span className="subtitle">MLK Day 2026</span>
                <h1>MLK Day Form QR Codes</h1>
                <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Scan to open the form or tap Open Form.</p>
            </header>

            <div className="forms-grid">
                {formsData.map((form) => (
                    <div key={form.title} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', minHeight: '3em' }}>{form.title}</h3>

                        <div style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '1.5rem' }}>
                            <img
                                src={`/${form.qr_png}`}
                                alt={`QR code for ${form.title}`}
                                loading="lazy"
                                style={{ width: '180px', height: '180px', display: 'block' }}
                            />
                        </div>

                        <a href={form.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center' }}>
                            Open Form Link
                        </a>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                            <a href={`/${form.qr_png}`} download target="_blank" rel="noopener noreferrer" style={{ color: '#888' }}>Download PNG</a>
                            <span style={{ color: '#333' }}>|</span>
                            <a href={`/${form.qr_svg}`} download target="_blank" rel="noopener noreferrer" style={{ color: '#888' }}>Download SVG</a>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: '#111', borderRadius: '8px' }}>
                <h4 style={{ color: 'var(--caat-yellow)' }}>Experience Logic</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <Link to="/" className="btn" style={{ background: 'transparent', border: '1px solid #666', color: '#ccc' }}>Back to Home</Link>
                    <Link to="/latham-stations" className="btn" style={{ background: 'transparent', border: '1px solid #666', color: '#ccc' }}>Latham Stations</Link>
                </div>
            </div>

            {/* Inline Styles for Grid */}
            <style>{`
                .forms-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1.5rem;
                }
                @media (min-width: 600px) {
                    .forms-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 900px) {
                    .forms-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
        </div>
    );
}
