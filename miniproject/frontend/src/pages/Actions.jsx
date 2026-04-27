import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Actions.css';

export default function Actions() {
  const [actions, setActions] = useState([]);
  const [localCompleted, setLocalCompleted] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  const fallbackActions = [
    { id: 501, title: 'Use a reusable water bottle for a week', difficulty: 'Easy', impact: 'Medium', points: 20 },
    { id: 502, title: 'Switch to energy-efficient LED bulbs', difficulty: 'Easy', impact: 'Medium', points: 30 },
    { id: 503, title: 'Commute via bike or public transit', difficulty: 'Medium', impact: 'High', points: 50 },
    { id: 504, title: 'Start a home composting bin', difficulty: 'Hard', impact: 'High', points: 100 }
  ];

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/actions');
        setActions(res.data);
      } catch (err) {
        console.error('Error fetching actions, using fallback:', err.message);
        setActions(fallbackActions);
      }
    };
    fetchActions();
  }, []);

  const handleComplete = async (id, points) => {
    if (!user) {
      alert('Please login to track actions and earn points!');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/actions/${id}/complete`);
      setUser(prev => ({ ...prev, points: res.data.points }));
      
      if (res.data.completed) {
        setLocalCompleted(prev => [...prev, id]);
      } else {
        setLocalCompleted(prev => prev.filter(item => item !== id));
      }
      alert(res.data.msg);
    } catch (err) {
      console.error('Error completing action:', err.message);
      setUser(prev => ({ ...prev, points: (prev.points || 0) + points }));
      setLocalCompleted(prev => [...prev, id]);
      alert('Action completed! (Offline Mode)');
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Take Action</h1>
        <p>Complete eco-friendly tasks, earn points, and track your environmental impact.</p>
      </header>

      <div className="grid grid-3">
        {actions.map(action => {
          const isCompleted = localCompleted.includes(action.id) || 
                             user?.CompletedActions?.some(a => a.id === action.id);
          
          return (
            <div key={action.id} className={`card action-card ${isCompleted ? 'completed' : ''}`}>
              <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                <span 
                  className="difficulty-badge" 
                  style={{ backgroundColor: `${getDifficultyColor(action.difficulty)}20`, color: getDifficultyColor(action.difficulty) }}
                >
                  {action.difficulty}
                </span>
                <span className="points-badge">+{action.points} pts</span>
              </div>
              <h3 className={`action-title ${isCompleted ? 'strike' : ''}`} style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
                {isCompleted && <i className="fas fa-check-circle" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>}
                {action.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                <strong>Impact:</strong> {action.impact}
              </p>
              <button 
                onClick={() => handleComplete(action.id, action.points)} 
                className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`} 
                style={{ width: '100%' }}
              >
                {isCompleted ? 'Completed ✓' : 'Complete Action'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

