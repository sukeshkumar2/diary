import { Link, useNavigate, Outlet } from 'react-router-dom';
import { LogOut, Book } from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="page">
            <header style={{
                background: 'var(--surface)',
                padding: '1rem',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
                        <Book size={24} />
                        <span>My Diary</span>
                    </Link>
                    <button onClick={handleLogout} className="btn" style={{ color: 'var(--text-muted)' }}>
                        <LogOut size={20} style={{ marginRight: '0.5rem' }} />
                        Logout
                    </button>
                </div>
            </header>
            <main className="container" style={{ flex: 1, padding: '2rem 1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
