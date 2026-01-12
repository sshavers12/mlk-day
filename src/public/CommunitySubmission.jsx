import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CommunitySubmission({ stationId, stationTitle }) {
    const [type, setType] = useState('text'); // 'text' or 'youtube'
    const [content, setContent] = useState('');
    const [name, setName] = useState(''); // Optional, store in notes or title? let's stick to payload or notes
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        if (!content.trim()) {
            setError('Please add some content.');
            setSubmitting(false);
            return;
        }

        try {
            const payload = {
                content: content,
                author_name: name || 'Anonymous'
            };

            const { error: dbError } = await supabase
                .from('submissions')
                .insert({
                    target_type: 'station',
                    target_id: stationId,
                    title: `Submission for ${stationTitle}`,
                    content_type: type,
                    payload: payload,
                    status: 'pending' // Default, but good to be explicit
                });

            if (dbError) throw dbError;

            setSuccess(true);
            setContent('');
            setName('');
        } catch (err) {
            console.error('Submission error:', err);
            setError('Failed to submit. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <h3 style={{ color: 'green' }}>Thank You!</h3>
                <p>Your submission has been received and is pending review.</p>
                <button onClick={() => setSuccess(false)} className="btn">Submit Another</button>
            </div>
        );
    }

    return (
        <div className="card" style={{ marginTop: '2rem', borderTop: '4px solid var(--caat-yellow)' }}>
            <h3>Community Voice</h3>
            <p>Share your reflection or a related video for <strong>{stationTitle}</strong>.</p>

            <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ marginRight: '1rem' }}>
                        <input
                            type="radio"
                            name="type"
                            value="text"
                            checked={type === 'text'}
                            onChange={(e) => setType(e.target.value)}
                        /> Text Reflection
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="youtube"
                            checked={type === 'youtube'}
                            onChange={(e) => setType(e.target.value)}
                        /> YouTube Link
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    {type === 'text' ? (
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                            style={{ width: '100%', height: '100px', padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }}
                        />
                    ) : (
                        <input
                            type="url"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="https://youtube.com/watch?v=..."
                            style={{ width: '100%', padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name (Optional)"
                        style={{ width: '100%', padding: '0.5rem', background: '#333', color: '#fff', border: '1px solid #555' }}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button disabled={submitting} className="btn">
                    {submitting ? 'Sending...' : 'Submit Contribution'}
                </button>
            </form>
        </div>
    );
}
