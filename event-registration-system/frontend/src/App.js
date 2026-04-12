import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://laughing-xylophone-wrjgw65g9r5526w9-5000.app.github.dev/";

function App() {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [email, setEmail] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const loadRegistrations = async () => {
    try {
      const response = await fetch(`${API_BASE}/registrations`);
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Load error:", error);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const addRegistration = async () => {
    try {
      if (!name || !eventName || !email) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, eventName, email })
      });

      const data = await response.json();
      alert(data.message);

      setName("");
      setEventName("");
      setEmail("");
      loadRegistrations();
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to connect to backend");
    }
  };

  const deleteRegistration = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      alert(data.message);
      loadRegistrations();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Event Registration System</h1>
        <p className="subtitle">Node.js + Express + MongoDB + React</p>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={addRegistration}>Register</button>
        </div>

        <h2>Registered Participants</h2>

        {registrations.length === 0 ? (
          <p className="empty">No registrations found.</p>
        ) : (
          <div className="list">
            {registrations.map((item) => (
              <div className="list-item" key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.eventName}</p>
                  <p>{item.email}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteRegistration(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;