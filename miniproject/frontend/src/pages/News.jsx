import { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fallbackNews = [
    { 
      id: 101, 
      title: 'Global Carbon Emissions Show Decline in Q1 2026', 
      category: 'Climate Change', 
      summary: 'The latest report from the International Energy Agency indicates a 3% drop in global carbon emissions compared to last year.', 
      date: '2026-04-10',
      image: 'https://images.unsplash.com/photo-1569000971952-6d0b63581174?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 102, 
      title: 'Major Cities Ban Single-Use Plastics', 
      category: 'Pollution', 
      summary: 'A coalition of 15 major metropolitan areas has officially implemented zero-tolerance policies for single-use plastics.', 
      date: '2026-04-08',
      image: 'https://images.unsplash.com/photo-1618477432743-1629d8a39c59?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 103, 
      title: 'Breakthrough in Solar Panel Efficiency', 
      category: 'Renewable Energy', 
      summary: 'Engineers have developed a new photovoltaic cell capable of 35% efficiency, promising cheaper solar power.', 
      date: '2026-04-05',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news, using fallback:', err.message);
        setNews(fallbackNews);
      }
    };
    fetchNews();
  }, []);

  const categories = ['All', 'Climate Change', 'Pollution', 'Renewable Energy', 'Wildlife'];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                         item.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <header className="news-header">
        <h1>Eco News</h1>
        <p>Stay updated with the latest stories and breakthroughs in sustainability.</p>
      </header>

      <div className="news-filters flex items-center justify-between">
        <input 
          type="text" 
          placeholder="Search articles..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="category-tags flex">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              className={`tag-btn ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: '40px' }}>
        {filteredNews.map(item => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '16px' }} />
            <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
              <span className="user-points" style={{ fontSize: '0.8rem' }}>{item.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}><i className="far fa-calendar"></i> {item.date}</span>
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>{item.summary}</p>

            <a 
              href={item.url || 'https://www.unep.org/news-and-stories'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ width: '100%', textAlign: 'center', display: 'inline-block' }}
            >
              Read Full Article <i className="fas fa-external-link-alt" style={{ marginLeft: '8px' }}></i>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
