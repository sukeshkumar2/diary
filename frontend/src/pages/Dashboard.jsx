import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // We will customize this later
import api from '../api';
import { format, parse } from 'date-fns';
import { PenTool } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await api.get('/entries/');
            setEntries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const hasEntry = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return entries.find(e => e.date === dateStr);
    };

    const handleDateClick = (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        navigate(`/entry/${dateStr}`);
    };

    const handleWriteToday = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        navigate(`/entry/${today}`);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Diary</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Overview of your journey</p>
                </div>
                <button onClick={handleWriteToday} className="btn btn-primary">
                    <PenTool size={18} style={{ marginRight: '0.5rem' }} />
                    Write for Today
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', height: 'calc(100vh - 200px)' }}>
                {/* Left Column: Entry List */}
                <div style={{ overflowY: 'auto', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', position: 'sticky', top: 0, background: 'var(--background)', zIndex: 5, paddingBottom: '0.5rem' }}>Recent Entries</h2>
                    {entries.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No entries yet. Start writing today!</p>
                    ) : (
                        entries.map(entry => (
                            <div
                                key={entry.date}
                                onClick={() => handleDateClick(parse(entry.date, 'yyyy-MM-dd', new Date()))}
                                className="card"
                                style={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    fontSize: '2rem',
                                    background: 'var(--background)',
                                    borderRadius: '50%',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {entry.mood}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{format(parse(entry.date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {entry.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Column: Calendar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="card" style={{ padding: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>Calendar</h2>
                        <Calendar
                            onClickDay={handleDateClick}
                            tileContent={({ date, view }) => {
                                if (view === 'month') {
                                    const entry = hasEntry(date);
                                    return entry ? <div style={{ fontSize: '0.8rem', marginTop: '2px' }}>{entry.mood}</div> : null;
                                }
                            }}
                            className="custom-calendar"
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .react-calendar {
                    border: none;
                    width: 100%;
                    font-family: var(--font-main);
                    background: transparent;
                }
                .react-calendar__tile {
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;
                    border-radius: var(--radius);
                    font-size: 0.8rem;
                }
                .react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus {
                    background-color: var(--background);
                }
                .react-calendar__tile--now {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                }
                .react-calendar__tile--active {
                    background: var(--primary) !important;
                    color: white !important;
                }
                /* Hide scrollbar for Chrome, Safari and Opera */
                div::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                div {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
                }
             `}</style>
        </div>
    );
};

export default Dashboard;
