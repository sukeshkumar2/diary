import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { Book } from 'lucide-react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/', { username, password });
            // Auto login after signup
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await api.post('/token', formData);
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.detail);
            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--background)' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                        <Book size={48} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '1.5rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Start your digital diary today</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {error && <div style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</div>}

                    <input
                        type="text"
                        placeholder="Username"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Sign Up
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 500 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
