import React, { useEffect, useState } from "react";
import "./App.css";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : window.location.origin.replace("-3000", "-5000");


function App() {
  const [name, setName] = useState("");
  const [eventName, setEventName] = useState("");
  const [email, setEmail] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRegistrations = async () => {
    try {
      const response = await fetch(`${API_BASE}/registrations`);
      const data = await response.json();
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Load error:", error);
      setMessage("Failed to load registrations.");
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const addRegistration = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !eventName.trim() || !email.trim()) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          eventName: eventName.trim(),
          email: email.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setMessage(data.message || "Registration added successfully.");
      setName("");
      setEventName("");
      setEmail("");
      await loadRegistrations();
    } catch (error) {
      console.error("Add error:", error);
      setMessage("Failed to connect to backend.");
    }

    setLoading(false);
  };

  const deleteRegistration = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      setMessage(data.message || "Deleted successfully.");
      await loadRegistrations();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to delete registration.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Event Registration System</h1>
        <p className="subtitle">Node.js + Express + MongoDB + React</p>

        <form className="form-group" onSubmit={addRegistration}>
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

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "12px", fontWeight: "bold" }}>
            {message}
          </p>
        )}

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
                  type="button"
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