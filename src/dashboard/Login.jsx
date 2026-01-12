import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { checkAndBootstrapAdmin } from '../services/admin';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [configError, setConfigError] = useState(false);

    useEffect(() => {
        const url = import.meta.env.VITE_SUPABASE_URL;
        if (!url || url.includes('placeholder') || url.includes('YOUR_SUPABASE_URL')) {
            setConfigError(true);
        } else {
            // Check if already logged in and handle bootstrap
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session?.user) {
                    checkAndBootstrapAdmin(session.user.email, session.user.id).then(() => {
                        navigate('/dashboard/admin');
                    });
                }
            });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin + '/dashboard/admin'
                }
            });
            if (error) throw error;
            setMessage('Check your email for the login link!');

            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    await checkAndBootstrapAdmin(session.user.email, session.user.id);
                    navigate('/dashboard/admin');
                }
            });

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (configError) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                color: '#fff',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#FFD400', marginBottom: '1rem' }}>Configuration Required</h1>
                <p style={{ maxWidth: '600px', marginBottom: '2rem', color: '#ccc' }}>
                    Dashboard access requires a valid Supabase connection.
                    The application is currently running in <strong>read-only mode</strong> using local seed data.
                </p>
                <div style={{ border: '1px solid #333', padding: '1rem', borderRadius: '4px', background: '#111' }}>
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>Missing Environment Variables:</p>
                    <code style={{ color: '#FFD400' }}>VITE_SUPABASE_URL</code><br />
                    <code style={{ color: '#FFD400' }}>VITE_SUPABASE_ANON_KEY</code>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000', color: '#fff' }}>
            <h1>MLK Ops Dashboard</h1>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--caat-gold)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '.75rem', background: '#333', border: '1px solid #555', color: '#fff' }}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Sending...' : 'Sign In'}
                    </button>
                </form>
                {message && <p style={{ marginTop: '1rem', color: 'var(--caat-gold)' }}>{message}</p>}

                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                    <p>Dev/Test Access (if no backend):</p>
                    <p>Admin: admin@test.com</p>
                    <p>Volunteer: vol@test.com</p>
                </div>
            </div>
        </div>
    );
}
