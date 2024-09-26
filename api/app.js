const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const app = express();
app.use(express.json());

// Load environment variables
require("dotenv").config();

// Use CORS middleware
// app.use(cors()); // This will enable CORS for all routes and origins
app.use(cors({
  origin: ['https://kajnen.vercel.app', 'http://localhost:3000'], // Replace with your allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


// Importing Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the database"));

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/", (req, res) => res.send("Express on Vercel"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app
