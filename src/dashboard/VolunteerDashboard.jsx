import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function VolunteerDashboard() {
    const [stations, setStations] = useState([]);
    const [selectedStationId, setSelectedStationId] = useState('');
    const [currentStatus, setCurrentStatus] = useState(null); // { status, note }
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch stations on mount
    useEffect(() => {
        async function fetchStations() {
            // Get stations (public read is allowed)
            const { data: stData, error: stError } = await supabase
                .from('stations')
                .select('id, title, slug, display_order, volunteer_script')
                .eq('is_published', true)
                .order('display_order');

            if (stError) console.error('Error fetching stations:', stError);
            else setStations(stData || []);
            setLoading(false);
        }
        fetchStations();
    }, []);

    // Subscribe to status changes for selected station
    useEffect(() => {
        if (!selectedStationId) {
            setCurrentStatus(null);
            return;
        }

        // Fetch initial status
        async function fetchStatus() {
            const { data, error } = await supabase
                .from('station_status')
                .select('*')
                .eq('station_id', selectedStationId)
                .maybeSingle();

            if (error) console.error('Error fetching status:', error);
            if (data) setCurrentStatus(data);
            else setCurrentStatus({ status: 'open', note: '' }); // Default if no record
        }
        fetchStatus();

        // Real-time subscription
        const channel = supabase
            .channel(`station-${selectedStationId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'station_status',
                filter: `station_id=eq.${selectedStationId}`
            }, (payload) => {
                setCurrentStatus(payload.new);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedStationId]);

    const handleUpdateStatus = async (newStatus) => {
        if (!selectedStationId) return;
        setUpdating(true);

        try {
            // Upsert status
            const updates = {
                station_id: selectedStationId,
                status: newStatus,
                note: currentStatus?.note || '',
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('station_status')
                .upsert(updates);

            if (error) throw error;
            // Optimistic update handled by subscription mostly, but we can set it too
            setCurrentStatus({ ...currentStatus, status: newStatus });

        } catch (error) {
            alert('Error updating status: ' + error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading stations...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem', color: '#fff' }}>Volunteer Console</h1>

            {/* Station Selector */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Select Your Assigned Station:</label>
                <select
                    value={selectedStationId}
                    onChange={(e) => setSelectedStationId(e.target.value)}
                    style={{ width: '100%', padding: '1rem', fontSize: '1rem', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
                >
                    <option value="">-- Choose Station --</option>
                    {stations.map(st => (
                        <option key={st.id} value={st.id}>{st.display_order}. {st.title}</option>
                    ))}
                </select>
            </select>

            {selectedStationId && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#333', borderLeft: '4px solid var(--caat-gold)', color: '#fff', fontStyle: 'italic' }}>
                    <strong>Volunteer Script:</strong> "<br />
                    {stations.find(s => s.id === selectedStationId)?.volunteer_script || 'No script available.'}
                    "
                </div>
            )}
        </div>

            {
        selectedStationId && (
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>{stations.find(s => s.id === selectedStationId)?.title}</h2>
                    <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        background: currentStatus?.status === 'open' ? 'rgba(0,255,0,0.2)' :
                            currentStatus?.status === 'busy' ? 'rgba(255,165,0,0.2)' : 'rgba(255,0,0,0.2)',
                        color: currentStatus?.status === 'open' ? '#00FF00' :
                            currentStatus?.status === 'busy' ? '#FFA500' : '#FF4444',
                        border: `1px solid ${currentStatus?.status === 'open' ? '#00FF00' :
                            currentStatus?.status === 'busy' ? '#FFA500' : '#FF4444'}`
                    }}>
                        CURRENT: {currentStatus?.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    <button
                        onClick={() => handleUpdateStatus('open')}
                        disabled={updating}
                        style={{
                            padding: '1.5rem',
                            background: currentStatus?.status === 'open' ? '#00FF00' : '#111',
                            color: currentStatus?.status === 'open' ? '#000' : '#00FF00',
                            border: '2px solid #00FF00',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: updating ? 0.5 : 1
                        }}
                    >
                        🟢 OPEN
                    </button>

                    <button
                        onClick={() => handleUpdateStatus('busy')}
                        disabled={updating}
                        style={{
                            padding: '1.5rem',
                            background: currentStatus?.status === 'busy' ? '#FFA500' : '#111',
                            color: currentStatus?.status === 'busy' ? '#000' : '#FFA500',
                            border: '2px solid #FFA500',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: updating ? 0.5 : 1
                        }}
                    >
                        🟡 BUSY / AT CAPACITY
                    </button>

                    <button
                        onClick={() => handleUpdateStatus('closed')}
                        disabled={updating}
                        style={{
                            padding: '1.5rem',
                            background: currentStatus?.status === 'closed' ? '#FF4444' : '#111',
                            color: currentStatus?.status === 'closed' ? '#000' : '#FF4444',
                            border: '2px solid #FF4444',
                            borderRadius: '8px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: updating ? 0.5 : 1
                        }}
                    >
                        🔴 CLOSED
                    </button>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa' }}>Public Note (Optional):</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="e.g. Back in 5 mins..."
                            value={currentStatus?.note || ''}
                            onChange={(e) => setCurrentStatus({ ...currentStatus, note: e.target.value })}
                            style={{ flexGrow: 1, padding: '1rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                        />
                        <button
                            onClick={() => handleUpdateStatus(currentStatus?.status)}
                            disabled={updating}
                            className="btn"
                        >
                            Save Note
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        </div >
    );
}
