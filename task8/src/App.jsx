import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@300;400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f;
    --surface: #13131f;
    --card: #1a1a2a;
    --border: rgba(255,255,255,0.08);
    --gold: #f5c842;
    --gold2: #ff8c42;
    --blue: #4fa3ff;
    --green: #42f5a7;
    --text: #f0f0f8;
    --muted: #6b6b8a;
    --font-h: 'Bebas Neue', sans-serif;
    --font-b: 'Nunito', sans-serif;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-b); min-height: 100vh; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); } 50% { box-shadow: 0 0 0 10px rgba(245,200,66,0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes ticker { from { transform:translateX(100%); } to { transform:translateX(-100%); } }
  .fade { animation: fadeUp 0.5s ease forwards; opacity:0; }
  .d1{animation-delay:.1s} .d2{animation-delay:.2s} .d3{animation-delay:.3s} .d4{animation-delay:.4s}
  /* Nav */
  nav {
    position: fixed; top:0; left:0; right:0; z-index:200;
    display:flex; align-items:center; justify-content:space-between;
    padding: 1rem 2rem;
    background: rgba(10,10,15,0.85); backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .logo { font-family: var(--font-h); font-size:1.6rem; letter-spacing:.08em; color: var(--gold); }
  .logo span { color: var(--text); }
  .nav-links { display:flex; gap:1.5rem; align-items:center; }
  .nav-links a { color:var(--muted); text-decoration:none; font-size:.85rem; font-weight:600; transition:color .2s; }
  .nav-links a:hover, .nav-links a.active { color:var(--gold); }
  .nav-btn {
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    color: #0a0a0f; border:none; padding:.45rem 1.1rem; border-radius:99px;
    font-family:var(--font-b); font-weight:700; font-size:.8rem; cursor:pointer;
    transition: opacity .2s, transform .15s;
  }
  .nav-btn:hover { opacity:.85; transform:scale(1.04); }
  /* Ticker */
  .ticker { background: var(--gold); color:#0a0a0f; padding:.35rem 0; overflow:hidden; margin-top:64px; }
  .ticker-inner { display:flex; white-space:nowrap; animation: ticker 22s linear infinite; font-size:.78rem; font-weight:700; letter-spacing:.08em; }
  .ticker-inner span { margin: 0 2.5rem; }
  /* Page */
  .page { max-width:1000px; margin:0 auto; padding:2.5rem 1.5rem 4rem; }
  /* Hero */
  .hero { text-align:center; padding: 3rem 0 2rem; }
  .hero-badge { display:inline-block; background:rgba(245,200,66,.12); border:1px solid rgba(245,200,66,.3); color:var(--gold); font-size:.72rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; padding:.3rem .9rem; border-radius:99px; margin-bottom:1.2rem; }
  .hero h1 { font-family:var(--font-h); font-size:clamp(3rem,8vw,5.5rem); letter-spacing:.04em; line-height:1; margin-bottom:1rem; }
  .hero h1 em { color:var(--gold); font-style:normal; }
  .hero p { color:var(--muted); font-size:.95rem; max-width:480px; margin:0 auto 2rem; line-height:1.7; }
  /* Search bar */
  .search-bar {
    display:flex; gap:.6rem; flex-wrap:wrap; justify-content:center;
    background:var(--surface); border:1px solid var(--border); border-radius:14px;
    padding:1rem; max-width:700px; margin:0 auto 3rem;
  }
  .search-bar select, .search-bar input {
    flex:1; min-width:140px; background:var(--card); border:1px solid var(--border);
    color:var(--text); font-family:var(--font-b); font-size:.85rem;
    padding:.6rem 1rem; border-radius:8px; outline:none; transition:border-color .2s;
  }
  .search-bar select:focus, .search-bar input:focus { border-color:var(--gold); }
  .search-bar option { background:var(--card); }
  .search-btn {
    background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#0a0a0f;
    border:none; padding:.6rem 1.6rem; border-radius:8px; font-weight:700;
    font-family:var(--font-b); font-size:.85rem; cursor:pointer; transition:transform .15s;
    white-space:nowrap;
  }
  .search-btn:hover { transform:scale(1.04); }
  /* Section heading */
  .sec-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.2rem; }
  .sec-title { font-family:var(--font-h); font-size:1.8rem; letter-spacing:.05em; }
  .sec-title span { color:var(--gold); }
  .sec-sub { color:var(--muted); font-size:.78rem; }
  /* Event cards grid */
  .events-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1.2rem; margin-bottom:3rem; }
  .event-card {
    background:var(--card); border:1px solid var(--border); border-radius:16px;
    overflow:hidden; cursor:pointer; transition:transform .2s, border-color .2s, box-shadow .2s;
    position:relative;
  }
  .event-card:hover { transform:translateY(-5px); border-color:var(--gold); box-shadow:0 12px 40px rgba(245,200,66,.12); }
  .event-thumb {
    height:140px; display:flex; align-items:center; justify-content:center;
    font-size:3.5rem; position:relative;
  }
  .event-badge {
    position:absolute; top:.7rem; right:.7rem; font-size:.65rem; font-weight:700;
    padding:.2rem .6rem; border-radius:99px; letter-spacing:.08em; text-transform:uppercase;
  }
  .badge-hot { background:rgba(255,80,80,.18); color:#ff5050; border:1px solid rgba(255,80,80,.3); }
  .badge-new { background:rgba(66,245,167,.18); color:var(--green); border:1px solid rgba(66,245,167,.3); }
  .badge-sold { background:rgba(107,107,138,.18); color:var(--muted); border:1px solid var(--border); }
  .event-info { padding:1rem 1.1rem 1.2rem; }
  .event-name { font-family:var(--font-h); font-size:1.2rem; letter-spacing:.04em; margin-bottom:.3rem; }
  .event-meta { color:var(--muted); font-size:.75rem; margin-bottom:.8rem; display:flex; gap:.8rem; flex-wrap:wrap; }
  .event-meta span { display:flex; align-items:center; gap:.3rem; }
  .event-footer { display:flex; align-items:center; justify-content:space-between; }
  .event-price { font-weight:700; font-size:1rem; color:var(--gold); }
  .book-btn {
    background:var(--surface); border:1px solid var(--gold); color:var(--gold);
    font-family:var(--font-b); font-size:.75rem; font-weight:700; padding:.4rem .9rem;
    border-radius:99px; cursor:pointer; transition:all .2s;
  }
  .book-btn:hover:not(:disabled) { background:var(--gold); color:#0a0a0f; animation: pulse 1s; }
  .book-btn:disabled { border-color:var(--muted); color:var(--muted); cursor:not-allowed; }
  /* Cart sidebar */
  .cart-panel {
    position:fixed; right:0; top:0; bottom:0; width:320px; z-index:300;
    background:var(--surface); border-left:1px solid var(--border);
    display:flex; flex-direction:column;
    transform:translateX(100%); transition:transform .3s ease;
  }
  .cart-panel.open { transform:translateX(0); }
  .cart-head { display:flex; align-items:center; justify-content:space-between; padding:1.2rem 1.4rem; border-bottom:1px solid var(--border); }
  .cart-head h2 { font-family:var(--font-h); font-size:1.4rem; letter-spacing:.06em; }
  .cart-close { background:none; border:none; color:var(--muted); font-size:1.4rem; cursor:pointer; transition:color .2s; }
  .cart-close:hover { color:var(--text); }
  .cart-items { flex:1; overflow-y:auto; padding:1rem 1.4rem; display:flex; flex-direction:column; gap:.8rem; }
  .cart-empty { color:var(--muted); font-size:.85rem; text-align:center; margin-top:3rem; }
  .cart-item { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:.8rem 1rem; display:flex; align-items:center; gap:.8rem; }
  .cart-item-icon { font-size:1.6rem; }
  .cart-item-info { flex:1; }
  .cart-item-name { font-size:.85rem; font-weight:700; }
  .cart-item-qty { color:var(--muted); font-size:.75rem; margin-top:.15rem; }
  .cart-item-price { color:var(--gold); font-weight:700; font-size:.9rem; }
  .qty-ctrl { display:flex; align-items:center; gap:.4rem; margin-top:.4rem; }
  .qty-btn { background:var(--surface); border:1px solid var(--border); color:var(--text); width:22px; height:22px; border-radius:4px; cursor:pointer; font-size:.85rem; display:flex; align-items:center; justify-content:center; transition:border-color .2s; }
  .qty-btn:hover { border-color:var(--gold); color:var(--gold); }
  .cart-footer { padding:1.2rem 1.4rem; border-top:1px solid var(--border); }
  .cart-total { display:flex; justify-content:space-between; font-weight:700; margin-bottom:1rem; font-size:1rem; }
  .cart-total span:last-child { color:var(--gold); font-size:1.1rem; }
  .checkout-btn {
    width:100%; background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#0a0a0f;
    border:none; padding:.85rem; border-radius:10px; font-family:var(--font-b);
    font-weight:700; font-size:.95rem; cursor:pointer; transition:opacity .2s, transform .15s;
  }
  .checkout-btn:hover { opacity:.88; transform:scale(1.02); }
  /* Cart fab */
  .cart-fab {
    position:fixed; bottom:2rem; right:2rem; z-index:250;
    width:56px; height:56px; border-radius:50%;
    background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#0a0a0f;
    border:none; font-size:1.4rem; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 20px rgba(245,200,66,.35); transition:transform .2s;
  }
  .cart-fab:hover { transform:scale(1.1); }
  .cart-fab-badge {
    position:absolute; top:-4px; right:-4px; background:#ff4d6d; color:#fff;
    width:20px; height:20px; border-radius:50%; font-size:.65rem; font-weight:700;
    display:flex; align-items:center; justify-content:center;
  }
  /* Overlay */
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,.5); z-index:250; backdrop-filter:blur(3px); }
  /* Success modal */
  .modal-wrap { position:fixed; inset:0; z-index:400; display:flex; align-items:center; justify-content:center; padding:1rem; }
  .modal {
    background:var(--surface); border:1px solid var(--border); border-radius:20px;
    padding:2.5rem; text-align:center; max-width:380px; width:100%;
    animation: fadeUp .4s ease;
  }
  .modal-icon { font-size:3.5rem; margin-bottom:1rem; }
  .modal h2 { font-family:var(--font-h); font-size:2rem; letter-spacing:.06em; margin-bottom:.5rem; color:var(--green); }
  .modal p { color:var(--muted); font-size:.85rem; line-height:1.7; margin-bottom:1.5rem; }
  .modal-close { background:var(--card); border:1px solid var(--border); color:var(--text); font-family:var(--font-b); font-size:.85rem; font-weight:600; padding:.6rem 1.6rem; border-radius:99px; cursor:pointer; transition:border-color .2s; }
  .modal-close:hover { border-color:var(--green); color:var(--green); }
  /* My Tickets page */
  .tickets-list { display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem; }
  .ticket-card {
    background:var(--card); border:1px solid var(--border); border-radius:14px;
    display:flex; align-items:center; gap:1.2rem; padding:1.1rem 1.4rem;
    position:relative; overflow:hidden;
  }
  .ticket-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:linear-gradient(180deg,var(--gold),var(--gold2)); }
  .ticket-icon { font-size:2.2rem; }
  .ticket-info { flex:1; }
  .ticket-name { font-family:var(--font-h); font-size:1.1rem; letter-spacing:.04em; }
  .ticket-meta { color:var(--muted); font-size:.75rem; margin-top:.2rem; }
  .ticket-price { color:var(--gold); font-weight:700; font-size:1rem; }
  .empty-state { text-align:center; padding:4rem 0; color:var(--muted); }
  .empty-state div { font-size:3rem; margin-bottom:1rem; }
  /* Filters */
  .filters { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:1.5rem; }
  .filter-pill {
    background:var(--card); border:1px solid var(--border); color:var(--muted);
    font-family:var(--font-b); font-size:.75rem; font-weight:600; padding:.35rem .9rem;
    border-radius:99px; cursor:pointer; transition:all .2s;
  }
  .filter-pill.active, .filter-pill:hover { background:rgba(245,200,66,.1); border-color:var(--gold); color:var(--gold); }
  @media(max-width:600px) {
    nav { padding:.8rem 1rem; }
    .cart-panel { width:100%; }
    .page { padding:1.5rem 1rem 4rem; }
  }
`;

const EVENTS = [
  { id:1, emoji:"🎸", name:"Neon Pulse Fest", date:"Apr 12, 2026", venue:"Mumbai Arena", category:"Music", price:1299, badge:"hot", seats:120 },
  { id:2, emoji:"🏏", name:"IPL: MI vs CSK", date:"Apr 18, 2026", venue:"Wankhede Stadium", category:"Sports", price:899, badge:"hot", seats:340 },
  { id:3, emoji:"🎭", name:"Shakespeare Live", date:"May 3, 2026", venue:"NCPA, Mumbai", category:"Theatre", price:699, badge:"new", seats:60 },
  { id:4, emoji:"🎤", name:"Arijit Singh Live", date:"May 10, 2026", venue:"DY Patil Stadium", category:"Music", price:2499, badge:"hot", seats:0 },
  { id:5, emoji:"🎬", name:"Indie Film Gala", date:"May 22, 2026", venue:"PVR Director's Cut", category:"Cinema", price:499, badge:"new", seats:80 },
  { id:6, emoji:"🏀", name:"NBA India Games", date:"Jun 5, 2026", venue:"NSCI Dome", category:"Sports", price:1899, badge:"new", seats:200 },
];

const CATEGORIES = ["All", "Music", "Sports", "Theatre", "Cinema"];

function Nav({ cartCount, onCartOpen }) {
  const { pathname } = useLocation();
  return (
    <nav>
      <div className="logo">TICK<span>ET</span>X</div>
      <div className="nav-links">
        <Link to="/" className={pathname === "/" ? "active" : ""}>Events</Link>
        <Link to="/tickets" className={pathname === "/tickets" ? "active" : ""}>My Tickets</Link>
        <button className="nav-btn" onClick={onCartOpen}>🛒 Cart {cartCount > 0 && `(${cartCount})`}</button>
      </div>
    </nav>
  );
}

function CartPanel({ open, onClose, cart, onQty, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <div className={`cart-panel${open ? " open" : ""}`}>
        <div className="cart-head">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0
            ? <p className="cart-empty">No tickets yet.<br />Go grab some! 🎟️</p>
            : cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-icon">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => onQty(item.id, -1)}>−</button>
                    <span style={{fontSize:".8rem"}}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => onQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))
          }
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            <button className="checkout-btn" onClick={onCheckout}>Confirm Booking →</button>
          </div>
        )}
      </div>
    </>
  );
}

function Home({ cart, onBook }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { document.title = "TicketX — Book Events"; }, []);

  const filtered = EVENTS.filter(e =>
    (category === "All" || e.category === category) &&
    (query === "" || e.name.toLowerCase().includes(query.toLowerCase()))
  );

  const inCart = (id) => cart.find(i => i.id === id);

  return (
    <div className="page">
      {/* Ticker */}
      <div style={{position:"fixed",top:64,left:0,right:0,zIndex:150}}>
        <div className="ticker">
          <div className="ticker-inner">
            {["🔥 Arijit Singh SOLD OUT","⚡ IPL tickets selling fast","🎸 Neon Pulse — 120 seats left","🎭 Shakespeare — Limited seats","🏀 NBA India — Now Live"].map(t=><span key={t}>{t}</span>)}
            {["🔥 Arijit Singh SOLD OUT","⚡ IPL tickets selling fast","🎸 Neon Pulse — 120 seats left","🎭 Shakespeare — Limited seats","🏀 NBA India — Now Live"].map(t=><span key={t+"2"}>{t}</span>)}
          </div>
        </div>
      </div>
      <div style={{marginTop:"2.5rem"}}>
        {/* Hero */}
        <div className="hero">
          <div className="fade hero-badge">🎟️ Live Events 2026</div>
          <h1 className="fade d1">Book Your <em>Next</em><br />Experience</h1>
          <p className="fade d2">Concerts, sports, theatre & more — all in one place. Instant booking, zero hassle.</p>
        </div>
        {/* Search */}
        <div className="search-bar fade d3">
          <input
            ref={inputRef}
            className=""
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setQuery(search)}
            placeholder="🔍  Search events…"
          />
          <select defaultValue="All" onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="search-btn" onClick={() => setQuery(search)}>Search</button>
        </div>
        {/* Filters */}
        <div className="filters fade d3">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-pill${category === c ? " active" : ""}`} onClick={() => { setCategory(c); setQuery(""); setSearch(""); }}>
              {c}
            </button>
          ))}
        </div>
        {/* Events */}
        <div className="sec-head fade d4">
          <div className="sec-title">Upcoming <span>Events</span></div>
          <div className="sec-sub">{filtered.length} found</div>
        </div>
        <div className="events-grid">
          {filtered.map((e, i) => (
            <div className="event-card fade" key={e.id} style={{animationDelay: `${0.1*i}s`}}>
              <div className="event-thumb" style={{background: `linear-gradient(135deg,${["#1a1a3a","#1a2a1a","#2a1a1a","#1a2a2a"][i%4]},#0a0a0f)`}}>
                {e.emoji}
                <div className={`event-badge badge-${e.seats===0?"sold":e.badge}`}>
                  {e.seats===0 ? "Sold Out" : e.badge==="hot" ? "🔥 Hot" : "✨ New"}
                </div>
              </div>
              <div className="event-info">
                <div className="event-name">{e.name}</div>
                <div className="event-meta">
                  <span>📅 {e.date}</span>
                  <span>📍 {e.venue}</span>
                  {e.seats > 0 && <span>💺 {e.seats} left</span>}
                </div>
                <div className="event-footer">
                  <div className="event-price">₹{e.price.toLocaleString()}</div>
                  <button
                    className="book-btn"
                    disabled={e.seats === 0}
                    onClick={() => onBook(e)}
                  >
                    {inCart(e.id) ? `✓ In Cart (${inCart(e.id).qty})` : e.seats===0 ? "Sold Out" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyTickets({ booked }) {
  useEffect(() => { document.title = "TicketX — My Tickets"; }, []);
  const navigate = useNavigate();
  return (
    <div className="page" style={{paddingTop:"5rem"}}>
      <div className="sec-head fade">
        <div className="sec-title">My <span>Tickets</span></div>
        <div className="sec-sub">{booked.length} booked</div>
      </div>
      {booked.length === 0
        ? <div className="empty-state fade"><div>🎟️</div><p>No bookings yet.<br /><button className="nav-btn" style={{marginTop:"1rem"}} onClick={() => navigate("/")}>Browse Events</button></p></div>
        : <div className="tickets-list">
            {booked.map((b, i) => (
              <div className="ticket-card fade" key={b.id+"-"+i} style={{animationDelay:`${0.08*i}s`}}>
                <div className="ticket-icon">{b.emoji}</div>
                <div className="ticket-info">
                  <div className="ticket-name">{b.name}</div>
                  <div className="ticket-meta">📅 {b.date} &nbsp;·&nbsp; 📍 {b.venue} &nbsp;·&nbsp; 🎟️ {b.qty} ticket{b.qty>1?"s":""}</div>
                </div>
                <div className="ticket-price">₹{(b.price*b.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booked, setBooked] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleBook = (event) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === event.id);
      if (ex) return prev.map(i => i.id === event.id ? {...i, qty: i.qty+1} : i);
      return [...prev, {...event, qty:1}];
    });
  };

  const handleQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => i.id===id ? {...i, qty: i.qty+delta} : i).filter(i => i.qty > 0);
      return updated;
    });
  };

  const handleCheckout = () => {
    setBooked(prev => [...prev, ...cart]);
    setCart([]);
    setCartOpen(false);
    setSuccess(true);
  };

  const cartCount = cart.reduce((s,i) => s+i.qty, 0);

  return (
    <Router>
      <style>{css}</style>
      <Nav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onQty={handleQty} onCheckout={handleCheckout} />
      {cartCount > 0 && !cartOpen && (
        <button className="cart-fab" onClick={() => setCartOpen(true)}>
          🛒
          <div className="cart-fab-badge">{cartCount}</div>
        </button>
      )}
      {success && (
        <div className="modal-wrap">
          <div className="overlay" onClick={() => setSuccess(false)} />
          <div className="modal">
            <div className="modal-icon">🎉</div>
            <h2>Booking Confirmed!</h2>
            <p>Your tickets are booked successfully. Check "My Tickets" to view your bookings.</p>
            <button className="modal-close" onClick={() => setSuccess(false)}>Done</button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home cart={cart} onBook={handleBook} />} />
        <Route path="/tickets" element={<MyTickets booked={booked} />} />
      </Routes>
    </Router>
  );
}
