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
        <div className="dashboard-container">
            {/* Mobile Header */}
            <header className="dashboard-mobile-header">
                <span className="logo">MLK Ops</span>
                <button className="menu-toggle" onClick={() => navigate('/')}>Exit</button>
            </header>

            <aside className={`dashboard-sidebar`}>
                <h2 className="desktop-logo" style={{ color: 'var(--caat-yellow)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>MLK Ops</h2>

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

                <nav className="dashboard-nav">
                    {session?.role === 'admin' || session?.user?.email === 'admin@test.com' ? (
                        <>
                            <Link to="/dashboard/admin" className="nav-item">Overview</Link>
                            <Link to="/dashboard/admin/locations" className="nav-item dim">Locations</Link>
                            <Link to="/dashboard/admin/stations" className="nav-item dim">Stations</Link>
                            <Link to="/dashboard/admin/volunteers" className="nav-item dim">Volunteers</Link>
                        </>
                    ) : (
                        <Link to="/dashboard/volunteer" className="nav-item">My Station</Link>
                    )}
                </nav>

                <div className="dashboard-footer">
                    <div className="user-info">
                        Logged in as:<br />{session?.user?.email}
                    </div>
                    <button onClick={handleLogout} className="btn logout-btn">Logout</button>
                </div>
            </aside>

            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}
