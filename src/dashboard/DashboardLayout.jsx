import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function DashboardLayout() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for mock session first (DEV ONLY)
        const mockSession = localStorage.getItem('mlk_mock_session');
        if (mockSession) {
            setSession({ user: { email: mockSession === 'admin' ? 'admin@test.com' : 'vol@test.com', role: mockSession } });
            setLoading(false);
            return;
        }

        // Real Supabase session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (!session) navigate('/dashboard');
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session && !localStorage.getItem('mlk_mock_session')) navigate('/login');
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        if (localStorage.getItem('mlk_mock_session')) {
            localStorage.removeItem('mlk_mock_session');
            setSession(null);
            navigate('/login');
        } else {
            await supabase.auth.signOut();
            navigate('/login');
        }
    };

    if (loading) return <div style={{ background: '#000', color: '#fff', height: '100vh', padding: '2rem' }}>Loading Dashboard...</div>;

    // If on /dashboard (login) let it render, otherwise check auth
    // But wait, Outlet is for children. If I am the layout for /dashboard/*, I should protect children.
    // Routes in App.jsx will be:
    // /dashboard -> Login (public inside dashboard area)
    // /dashboard/admin -> AdminDashboard (protected)
    // /dashboard/volunteer -> VolunteerDashboard (protected)

    // Actually, usually Login is outside the protected layout.
    // I'll adjust App.jsx structure later. For now, this layout assumes it wraps protected routes.

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#111', color: '#fff' }}>
            <aside style={{ width: '250px', background: '#000', borderRight: '1px solid #333', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ color: 'var(--caat-gold)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>MLK Ops</h2>

                {/* Environment Status Indicator */}
                <div style={{ marginBottom: '2rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder') ? (
                        <>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFA500' }}></span>
                            <span style={{ color: '#aaa' }}>Ofline / Seed Mode</span>
                        </>
                    ) : (
                        <>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FF00' }}></span>
                            <span style={{ color: '#aaa' }}>Live (Supabase)</span>
                        </>
                    )}
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {session?.role === 'admin' || session?.user?.email === 'admin@test.com' ? (
                        <>
                            <Link to="/dashboard/admin" style={{ color: '#fff', textDecoration: 'none' }}>Overview</Link>
                            <Link to="/dashboard/admin/locations" style={{ color: '#aaa', textDecoration: 'none' }}>Locations</Link>
                            <Link to="/dashboard/admin/stations" style={{ color: '#aaa', textDecoration: 'none' }}>Stations</Link>
                            <Link to="/dashboard/admin/volunteers" style={{ color: '#aaa', textDecoration: 'none' }}>Volunteers</Link>
                        </>
                    ) : (
                        <Link to="/dashboard/volunteer" style={{ color: '#fff', textDecoration: 'none' }}>My Station</Link>
                    )}
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontSize: '.8rem', color: '#666', marginBottom: '1rem' }}>
                        Logged in as:<br />{session?.user?.email}
                    </div>
                    <button onClick={handleLogout} className="btn" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }}>Logout</button>
                </div>
            </aside>

            <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
}
