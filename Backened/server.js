const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();


app.use(cors({
  origin: function (origin, callback) {
    // Ye line allow karegi ki agar request tumhare frontend se hai toh wo pass ho jaye
    if (!origin || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes (Jo tumne pehle banaye the)
// app.use('/api/projects', projectRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/learning', learningRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route (Taaki "Not Found" na aaye)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found - " + req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});