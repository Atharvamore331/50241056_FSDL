const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Registration = require("./models/Registration");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect("mongodb+srv://Atharvamore_11:Atharva12345@cluster0.nyp35vd.mongodb.net/eventDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB ERROR:");
    console.log(err.message);
  });

// Home route
app.get("/", (req, res) => {
  res.send("Event Registration Backend Running");
});

// Add registration
app.post("/register", async (req, res) => {
  try {
    const { name, eventName, email } = req.body;

    if (!name || !eventName || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new Registration({
      name,
      eventName,
      email
    });

    await newRegistration.save();

    res.status(201).json({ message: "Registration added successfully" });
  } catch (error) {
    console.log("Register error:", error.message);
    res.status(500).json({ message: "Error saving registration" });
  }
});

// Get all registrations
app.get("/registrations", async (req, res) => {
  try {
    const data = await Registration.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    console.log("Fetch error:", error.message);
    res.status(500).json({ message: "Error fetching registrations" });
  }
});

// Delete registration
app.delete("/delete/:id", async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.log("Delete error:", error.message);
    res.status(500).json({ message: "Error deleting registration" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});