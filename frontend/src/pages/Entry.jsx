import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Save, ChevronLeft } from 'lucide-react';

const MOODS = ['😀', '😐', '😔', '😡', '😴'];

const Entry = () => {
    const { date } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('😐');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEntry();
    }, [date]);

    const fetchEntry = async () => {
        try {
            const res = await api.get(`/entries/${date}`);
            setContent(res.data.content);
            setMood(res.data.mood);
        } catch (err) {
            // Entry might not exist yet, which is fine
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await api.post('/entries/', {
                date: date,
                content: content,
                mood: mood
            });
            navigate('/');
        } catch (err) {
            console.error("Failed to save", err);
            alert("Failed to save entry");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '1rem', paddingLeft: 0, color: 'var(--text-muted)' }}>
                <ChevronLeft size={20} /> Back to Dashboard
            </button>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>Entry for {date}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {MOODS.map(m => (
                            <button
                                key={m}
                                onClick={() => setMood(m)}
                                style={{
                                    fontSize: '1.5rem',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    background: mood === m ? 'var(--background)' : 'transparent',
                                    border: mood === m ? '2px solid var(--primary)' : '2px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Dear Diary..."
                    style={{
                        width: '100%',
                        minHeight: '400px',
                        padding: '1rem',
                        border: 'none',
                        resize: 'none',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        fontFamily: 'inherit',
                        outline: 'none'
                    }}
                />

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSave} className="btn btn-primary">
                        <Save size={18} style={{ marginRight: '0.5rem' }} />
                        Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Entry;
