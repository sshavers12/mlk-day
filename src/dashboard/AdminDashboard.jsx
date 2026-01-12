import React from 'react';

export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>Admin Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ margin: '0 0 1rem 0' }}>Station Status</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                        <span>01 Belief</span>
                        <span style={{ color: 'green' }}>● Live</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                        <span>02 Courage</span>
                        <span style={{ color: 'green' }}>● Live</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                        <span>03 Identity</span>
                        <span style={{ color: 'orange' }}>● Issue</span>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ margin: '0 0 1rem 0' }}>Pending Approvals</h3>
                    <div style={{ background: '#222', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                        <p style={{ margin: 0, fontSize: '.9rem', color: '#fff' }}><strong>Station Update:</strong> 03 Identity</p>
                        <p style={{ margin: 0, fontSize: '.8rem' }}>Volunteer requested text change.</p>
                        <div style={{ marginTop: '.5rem', display: 'flex', gap: '.5rem' }}>
                            <button className="btn" style={{ padding: '.25rem .5rem', fontSize: '.7rem', background: 'green', color: '#fff' }}>Approve</button>
                            <button className="btn" style={{ padding: '.25rem .5rem', fontSize: '.7rem', background: '#333', color: '#fff', border: '1px solid #555' }}>Reject</button>
                        </div>
                    </div>
                    <p style={{ fontSize: '.8rem' }}>1 item in queue</p>
                </div>
            </div>
        </div>
    );
}
