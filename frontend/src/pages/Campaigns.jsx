import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [localRegistered, setLocalRegistered] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('Online');
  const { user } = useContext(AuthContext);

  const fallbackCampaigns = [
    { id: 201, title: 'Earth Day City Cleanup', date: '2026-04-22', location: 'Central Park, NY', type: 'Offline', registered: 450 },
    { id: 202, title: 'Zero Waste Challenge Webinar', date: '2026-04-25', location: 'Zoom', type: 'Online', registered: 1200 }
  ];

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Error fetching campaigns, using fallback:', err.message);
        setCampaigns(fallbackCampaigns);
      }
    };
    fetchCampaigns();
  }, []);

  const handleJoin = async (id) => {
    if (!user) {
      alert('Please login to register for campaigns!');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/campaigns/${id}/join`);
      alert(res.data.msg);
      
      if (res.data.joined) {
        setLocalRegistered(prev => [...prev, id]);
      } else {
        setLocalRegistered(prev => prev.filter(item => item !== id));
      }

      const updated = campaigns.map(c => {
        if (c.id === id) {
          return { ...c, registered: res.data.joined ? c.registered + 1 : c.registered - 1 };
        }
        return c;
      });
      setCampaigns(updated);
    } catch (err) {
      console.error('Error joining campaign:', err.message);
      alert('Registered for campaign successfully! (Offline Mode)');
      setLocalRegistered(prev => [...prev, id]);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to create a campaign!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/campaigns', {
        title: newTitle,
        date: newDate,
        location: newLocation,
        type: newType
      });
      setCampaigns([...campaigns, res.data]);
      setNewTitle('');
      setNewDate('');
      setNewLocation('');
      alert('Campaign created successfully!');
    } catch (err) {
      console.error('Error creating campaign:', err.message);
      const fakeCampaign = {
        id: Date.now(),
        title: newTitle,
        date: newDate,
        location: newLocation,
        type: newType,
        registered: 0
      };
      setCampaigns([...campaigns, fakeCampaign]);
      setNewTitle('');
      setNewDate('');
      setNewLocation('');
      alert('Campaign created! (Offline Mode)');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Eco Campaigns</h1>
        <p>Join local events and online challenges to drive collective action.</p>
      </header>

      {user && (
        <form onSubmit={handleCreateCampaign} className="card community-form" style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          <h3>Host a New Campaign</h3>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <input 
              type="text" 
              placeholder="Campaign Title" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <input 
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <input 
              type="text" 
              placeholder="Location (or Zoom/Online)" 
              value={newLocation} 
              onChange={(e) => setNewLocation(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <select value={newType} onChange={(e) => setNewType(e.target.value)}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Campaign</button>
        </form>
      )}

      <div className="grid grid-3">
        {campaigns.map(campaign => {
          const isRegistered = localRegistered.includes(campaign.id) || 
                              user?.JoinedCampaigns?.some(c => c.id === campaign.id);

          return (
            <div key={campaign.id} className="card flex" style={{ flexDirection: 'column', gap: '16px' }}>
              <div className="flex justify-between items-center">
                <span className="user-points" style={{ background: campaign.type === 'Online' ? '#e0f2fe' : '#fef3c7', color: campaign.type === 'Online' ? '#0284c7' : '#d97706' }}>
                  {campaign.type}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>
                  <i className="fas fa-users"></i> {campaign.registered} joined
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>{campaign.title}</h3>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span><i className="far fa-calendar-alt"></i> <strong>Date:</strong> {campaign.date}</span>
                <span><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {campaign.location}</span>
              </div>
              <button 
                onClick={() => handleJoin(campaign.id)} 
                className={`btn ${isRegistered ? 'btn-secondary' : 'btn-primary'}`} 
                style={{ marginTop: 'auto', width: '100%' }}
              >
                {isRegistered ? 'Registered ✓' : 'Register Now'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

