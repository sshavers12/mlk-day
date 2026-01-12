import React, { useState } from 'react';

export default function VolunteerDashboard() {
    const [status, setStatus] = useState('Not Ready');

    const handleStatus = (s) => setStatus(s);

    return (
        <div>
            <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>Volunteer Console</h1>

            <div className="card">
                <h3>My Assignment: Station 03 Identity</h3>
                <p>Current Status: <strong style={{ color: status === 'Live' ? 'green' : 'orange' }}>{status}</strong></p>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button onClick={() => handleStatus('Not Ready')} style={{ padding: '1rem', background: '#333', border: '1px solid #555', color: '#fff', borderRadius: '4px', opacity: status === 'Not Ready' ? 1 : .5 }}>Not Ready</button>
                    <button onClick={() => handleStatus('Ready')} style={{ padding: '1rem', background: 'blue', border: 'none', color: '#fff', borderRadius: '4px', opacity: status === 'Ready' ? 1 : .5 }}>Ready</button>
                    <button onClick={() => handleStatus('Live')} style={{ padding: '1rem', background: 'green', border: 'none', color: '#fff', borderRadius: '4px', opacity: status === 'Live' ? 1 : .5 }}>Live</button>
                    <button onClick={() => handleStatus('Issue')} style={{ padding: '1rem', background: 'red', border: 'none', color: '#fff', borderRadius: '4px', opacity: status === 'Issue' ? 1 : .5 }}>Report Issue</button>
                </div>
            </div>

            <div className="card">
                <h3>Submit Update</h3>
                <p>Found a typo or need to update the YouTube link?</p>
                <textarea style={{ width: '100%', height: '100px', background: '#222', border: '1px solid #444', color: '#fff', padding: '1rem', marginBottom: '1rem' }} placeholder="Describe your update..."></textarea>
                <button className="btn">Submit for Review</button>
            </div>
        </div>
    );
}
