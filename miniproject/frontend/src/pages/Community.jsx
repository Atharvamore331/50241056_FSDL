import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Community.css';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Sustainable Living');
  const { user } = useContext(AuthContext);

  const fallbackPosts = [
    { id: 301, author: 'EcoWarrior99', title: 'Switched to Bamboo Products!', content: 'I finally replaced all my bathroom plastics with bamboo alternatives. Surprisingly cheap and looks amazing!', category: 'Sustainable Living', likes: 142 },
    { id: 302, author: 'GreenTechFan', title: 'My DIY Solar Charger', content: 'Built a small solar rig for my balcony to charge all my devices. It feels great to run on the sun.', category: 'Renewable Energy', likes: 89 }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/community');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts, using fallback:', err.message);
        setPosts(fallbackPosts);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to share your eco story!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/community', { title, content, category });
      setPosts([res.data, ...posts]);
      setTitle('');
      setContent('');
      alert('Post shared successfully!');
    } catch (err) {
      console.error('Error creating post:', err.message);
      // Fallback UI simulation
      const newPost = {
        id: Date.now(),
        author: user.name || 'You',
        title,
        content,
        category,
        likes: 0
      };
      setPosts([newPost, ...posts]);
      setTitle('');
      setContent('');
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/community/${id}/like`);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: res.data.likes } : p));
    } catch (err) {
      console.error('Error liking post:', err.message);
      setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Eco Community</h1>
        <p>Share your sustainability journey and inspire others.</p>
      </header>

      {user && (
        <form onSubmit={handleSubmit} className="card community-form" style={{ marginBottom: '40px' }}>
          <h3>Share Your Story</h3>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Sustainable Living">Sustainable Living</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Conservation">Conservation</option>
              <option value="Zero Waste">Zero Waste</option>
            </select>
          </div>
          <div className="form-group">
            <textarea 
              placeholder="What did you do for the environment today?" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Post Story</button>
        </form>
      )}

      <div className="flex" style={{ flexDirection: 'column', gap: '24px' }}>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ textAlign: 'left' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
              <div className="flex items-center" style={{ gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {post.author[0].toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{post.author}</h4>
                  <span className="user-points" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{post.category}</span>
                </div>
              </div>
              <button onClick={() => handleLike(post.id)} className="like-btn">
                <i className="fas fa-thumbs-up"></i> {post.likes}
              </button>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{post.title}</h3>
            <p style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
