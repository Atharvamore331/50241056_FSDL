const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Registration = require("./models/Registration");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Atharvamore_11:Atharva12345@cluster0.nyp35vd.mongodb.net/eventDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB ERROR:");
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Event Registration Backend Running");
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend test successful" });
});

app.get("/registrations", async (req, res) => {
  try {
    console.log("GET /registrations called");
    const data = await Registration.find().sort({ _id: -1 });
    res.json(data);
  } catch (error) {
    console.log("Fetch error:", error.message);
    res.status(500).json({ message: "Error fetching registrations" });
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log("POST /register called");
    console.log("Request body:", req.body);

    const { name, eventName, email } = req.body;

    if (!name || !eventName || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new Registration({
      name,
      eventName,
      email
    });

    const savedData = await newRegistration.save();
    console.log("Saved data:", savedData);

    return res.status(201).json({
      message: "Registration added successfully",
      data: savedData
    });
  } catch (error) {
    console.log("Register error:", error.message);
    return res.status(500).json({ message: "Error saving registration" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    console.log("DELETE /delete called with id:", req.params.id);
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.log("Delete error:", error.message);
    res.status(500).json({ message: "Error deleting registration" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});