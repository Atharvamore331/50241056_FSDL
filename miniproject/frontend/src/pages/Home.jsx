import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [news, setNews] = useState([]);

  const fallbackNews = [
    { 
      id: 101, 
      title: 'Global Carbon Emissions Show Decline in Q1 2026', 
      category: 'Climate Change', 
      summary: 'The latest report indicates a 3% drop in global carbon emissions compared to last year.', 
      image: 'https://images.unsplash.com/photo-1569000971952-6d0b63581174?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 102, 
      title: 'Major Cities Ban Single-Use Plastics', 
      category: 'Pollution', 
      summary: 'A coalition of 15 major metropolitan areas has officially implemented zero-tolerance policies.', 
      image: 'https://images.unsplash.com/photo-1618477432743-1629d8a39c59?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNews(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching news, using fallback:', err.message);
        setNews(fallbackNews);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container animate-fade-in">
      <section className="hero">
        <h1>Empower Your Eco Journey</h1>
        <p>Stay informed with the latest environmental news, take impactful actions, and join a global community making a difference.</p>
        <div className="flex justify-center" style={{ gap: '16px', justifyContent: 'center' }}>
          <Link to="/actions" className="btn btn-primary">Take Action Now</Link>
          <Link to="/news" className="btn btn-secondary">Read Eco News</Link>
        </div>
      </section>

      <section className="stats">
        <div className="card stat-card">
          <div className="stat-number">12,450+</div>
          <p>Actions Completed</p>
        </div>
        <div className="card stat-card">
          <div className="stat-number">5,200kg</div>
          <p>CO2 Saved</p>
        </div>
        <div className="card stat-card">
          <div className="stat-number">8,900+</div>
          <p>Eco Warriors</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title">
          <h2>Trending Eco News</h2>
          <Link to="/news" className="btn btn-secondary">View All</Link>
        </div>
        <div className="grid grid-3">
          {news.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '16px' }} />
              <span className="user-points" style={{ fontSize: '0.8rem', display: 'inline-block', marginBottom: '8px' }}>{item.category}</span>
              <h3 style={{ marginBottom: '10px', fontSize: '1.25rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>{item.summary}</p>
              <Link to={`/news/${item.id}`} style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Read More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
