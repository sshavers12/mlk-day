import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
    const [stations, setStations] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [pendingSubmissions, setPendingSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();

        // Optional: Subscribe to changes (omitted for brevity, but recommended for live admin)
    }, []);

    const fetchDashboardData = async () => {
        try {
            // 1. Fetch Stations
            const { data: stData } = await supabase
                .from('stations')
                .select('id, title, display_order')
                .order('display_order');

            setStations(stData || []);

            // 2. Fetch Latest Statuses
            const { data: statusData } = await supabase
                .from('station_status')
                .select('station_id, status, note');

            // Map status by station_id
            const statusMap = {};
            statusData?.forEach(s => statusMap[s.station_id] = s);
            setStatuses(statusMap);

            // 3. Fetch Pending Submissions
            const { data: subData } = await supabase
                .from('submissions')
                .select('*')
                .eq('status', 'pending')
                .order('created_at', { ascending: false });

            setPendingSubmissions(subData || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmissionAction = async (id, action) => {
        // action = 'approved' or 'rejected'
        const { error } = await supabase
            .from('submissions')
            .update({ status: action })
            .eq('id', id);

        if (!error) {
            // Remove from local state
            setPendingSubmissions(prev => prev.filter(s => s.id !== id));
        } else {
            alert('Error updating submission: ' + error.message);
        }
    };

    if (loading) return <div style={{ color: '#fff' }}>Loading Admin Dashboard...</div>;

    return (
        <div>
            <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem', color: '#fff' }}>Admin Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* STATION STATUS CARD */}
                <div className="card">
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--caat-yellow)' }}>Station Status</h3>

                    {stations.map(st => {
                        const stStatus = statuses[st.id]?.status || 'unknown';
                        const color = stStatus === 'open' ? '#4CAF50' :
                            stStatus === 'busy' ? '#FFC107' :
                                stStatus === 'closed' ? '#F44336' : '#999';

                        return (
                            <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.75rem', borderBottom: '1px solid #333', paddingBottom: '.5rem' }}>
                                <span style={{ color: '#eee' }}>{st.display_order}. {st.title}</span>
                                <span style={{ color: color, textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    ● {stStatus}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* SUBMISSIONS QUEUE CARD */}
                <div className="card">
                    <h3 style={{ margin: '0 0 1rem 0', color: 'var(--caat-yellow)' }}>Pending Approvals</h3>

                    {pendingSubmissions.length === 0 ? (
                        <p style={{ color: '#aaa', fontStyle: 'italic' }}>No pending submissions.</p>
                    ) : (
                        pendingSubmissions.map(sub => (
                            <div key={sub.id} style={{ background: '#222', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', borderLeft: '3px solid var(--caat-red)' }}>
                                <p style={{ margin: 0, fontSize: '.9rem', color: '#fff' }}>
                                    <strong>{sub.title}</strong>
                                </p>
                                <p style={{ margin: '0.5rem 0', fontSize: '.9rem', color: '#ccc' }}>
                                    "{sub.payload?.content}"
                                </p>
                                <p style={{ fontSize: '.8rem', color: '#888' }}>
                                    By: {sub.payload?.author_name || 'Anonymous'}
                                </p>

                                <div style={{ marginTop: '.75rem', display: 'flex', gap: '.5rem' }}>
                                    <button
                                        onClick={() => handleSubmissionAction(sub.id, 'approved')}
                                        className="btn"
                                        style={{ padding: '.25rem .5rem', fontSize: '.8rem', background: 'var(--caat-green)', color: '#fff', border: 'none' }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleSubmissionAction(sub.id, 'rejected')}
                                        className="btn"
                                        style={{ padding: '.25rem .5rem', fontSize: '.8rem', background: '#333', color: '#fff', border: '1px solid #555' }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    <p style={{ fontSize: '.8rem', color: '#666', marginTop: '1rem' }}>
                        {pendingSubmissions.length} item(s) in queue
                    </p>
                </div>
            </div>
        </div>
    );
}
