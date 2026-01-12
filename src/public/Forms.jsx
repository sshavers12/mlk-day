import React from 'react';
import { Link } from 'react-router-dom';

const formsData = [
    {
        title: 'Alumni Hall Reflection – The Threshold',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSdgaY4LMlHIeiSQHiCLZMijitqtNfb6ItuSspkSf6p_t0CA3A/viewform',
        qr_png: 'assets/qr/forms/alumni_hall_reflection_the_threshold.png',
        qr_svg: 'assets/qr/forms/alumni_hall_reflection_the_threshold.svg'
    },
    {
        title: 'Harris Hall Reflection – I Belong Here',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSduQ9K2m3AQvemmWCWmwx69jiQ-JrC4Npey3V8ldMQXcKRBkQ/viewform',
        qr_png: 'assets/qr/forms/harris_hall_reflection_i_belong_here.png',
        qr_svg: 'assets/qr/forms/harris_hall_reflection_i_belong_here.svg'
    },
    {
        title: 'Lathem Hall Contributions – Beloved Community',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSe3__0j4QE9FYZEb4rJQtcIV2GfBn2OJgtzMN-mY9Q3F0MAvw/viewform',
        qr_png: 'assets/qr/forms/lathem_hall_contributions_beloved_community.png',
        qr_svg: 'assets/qr/forms/lathem_hall_contributions_beloved_community.svg'
    },
    {
        title: 'Lathem Station — Belief',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfYzNGTWTwmac6xj3WFoP_nI6geEWGi79o0pyWbQ1HfeWi2hA/viewform',
        qr_png: 'assets/qr/forms/lathem_hall_station_belief_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_belief_mlk_2026.svg'
    },
    {
        title: 'Lathem Station — Listening',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSf5rd7geOO7bRig_sGTz3UNnu4I4gDCVhskP9EAPRvJLXqZ8w/viewform',
        qr_png: 'assets/qr/forms/lathem_hall_station_listening_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_listening_mlk_2026.svg'
    },
    {
        title: 'Lathem Station — Courage',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSe3-GMnb3PONpvKniHwleDTyocOE1j5Z6VishnjM7kAd1I1uQ/viewform',
        qr_png: 'assets/qr/forms/lathem_hall_station_courage_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_courage_mlk_2026.svg'
    },
    {
        title: 'Lathem Station — Identity',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeeRLmifeAOwOSMcY_clrj1jfB70AdRc_-h9DQ68Uvvz_P5xQ/viewform',
        qr_png: 'assets/qr/forms/lathem_hall_station_identity_mlk_2026.png',
        qr_svg: 'assets/qr/forms/lathem_hall_station_identity_mlk_2026.svg'
    },
    {
        title: 'Lathem Station — Preparation',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSecK0YBANxwZdAzHm5PdBDc1yiG-HV9iAZdVe_aWHO7E2MmzA/viewform',
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
