import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // News State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Climate Change');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsTrending, setNewsTrending] = useState(false);

  // Action State
  const [actionTitle, setActionTitle] = useState('');
  const [actionDifficulty, setActionDifficulty] = useState('Easy');
  const [actionImpact, setActionImpact] = useState('Medium');
  const [actionPoints, setActionPoints] = useState(10);

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      alert('Access Denied. Admins only.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/news', {
        title: newsTitle,
        category: newsCategory,
        summary: newsSummary,
        date: newsDate,
        image: newsImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        url: newsUrl,
        trending: newsTrending
      });
      alert('News article added successfully!');
      setNewsTitle('');
      setNewsSummary('');
      setNewsDate('');
      setNewsImage('');
      setNewsUrl('');
      setNewsTrending(false);
    } catch (err) {
      console.error('Error adding news:', err.message);
      alert('Failed to add news. (Check backend connection)');
    }
  };

  const handleAddAction = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/actions', {
        title: actionTitle,
        difficulty: actionDifficulty,
        impact: actionImpact,
        points: actionPoints
      });
      alert('Eco Action added successfully!');
      setActionTitle('');
      setActionPoints(10);
    } catch (err) {
      console.error('Error adding action:', err.message);
      alert('Failed to add action. (Check backend connection)');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Admin Dashboard</h1>
        <p>Manage environmental content, campaigns, and user metrics.</p>
      </header>

      <div className="grid grid-2" style={{ gap: '40px', alignItems: 'start' }}>
        {/* Add News Form */}
        <div className="card">
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}><i className="fas fa-newspaper"></i> Add News Article</h2>
          <form onSubmit={handleAddNews} className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <input type="text" placeholder="Article Title" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)}>
                <option value="Climate Change">Climate Change</option>
                <option value="Pollution">Pollution</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>
            <div className="form-group">
              <input type="date" value={newsDate} onChange={(e) => setNewsDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="url" placeholder="External URL" value={newsUrl} onChange={(e) => setNewsUrl(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="url" placeholder="Image URL (Optional)" value={newsImage} onChange={(e) => setNewsImage(e.target.value)} />
            </div>
            <div className="form-group">
              <textarea placeholder="Article Summary" value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} required rows="4"></textarea>
            </div>
            <div className="form-group flex items-center" style={{ gap: '10px' }}>
              <input type="checkbox" id="trending" checked={newsTrending} onChange={(e) => setNewsTrending(e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="trending" style={{ color: 'var(--text)' }}>Mark as Trending</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish News</button>
          </form>
        </div>

        {/* Add Action Form */}
        <div className="card">
          <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}><i className="fas fa-leaf"></i> Add Eco Action</h2>
          <form onSubmit={handleAddAction} className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <input type="text" placeholder="Action Title" value={actionTitle} onChange={(e) => setActionTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <select value={actionDifficulty} onChange={(e) => setActionDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <select value={actionImpact} onChange={(e) => setActionImpact(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px', display: 'block' }}>Points Rewarded</label>
              <input type="number" value={actionPoints} onChange={(e) => setActionPoints(parseInt(e.target.value))} required min="5" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Add Action</button>
          </form>
        </div>
      </div>
    </div>
  );
}
