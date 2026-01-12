import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { checkAndBootstrapAdmin } from '../services/admin';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                // Check bootstrap
                await checkAndBootstrapAdmin(data.session.user.email, data.session.user.id);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000', color: '#fff' }}>
            <h1>MLK Ops Login</h1>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--caat-yellow)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '.75rem', background: '#333', border: '1px solid #555', color: '#fff' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--caat-yellow)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '.75rem', background: '#333', border: '1px solid #555', color: '#fff' }}
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" className="btn" style={{ justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Logging In...' : 'Sign In'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                        Need an account? <Link to="/signup" style={{ color: 'var(--caat-yellow)' }}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
