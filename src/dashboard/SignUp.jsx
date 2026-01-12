import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { checkAndBootstrapAdmin } from '../services/admin';

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            console.log("Sign up successful", data);

            // Check for admin bootstrap immediately upon signup success (if auto-confirm is on)
            if (data.user) {
                await checkAndBootstrapAdmin(data.user.email, data.user.id);
            }

            // Redirect to login or specific page
            navigate('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000', color: '#fff' }}>
            <h1>Sign Up</h1>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                    <div>
                        <label style={{ display: 'block', marginBottom: '.5rem', color: 'var(--caat-gold)' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            style={{ width: '100%', padding: '.75rem', background: '#333', border: '1px solid #555', color: '#fff' }}
                        />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" className="btn" style={{ justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--caat-gold)' }}>Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
