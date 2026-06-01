import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Basic health check route
app.get('/', (req, res) => {
    res.json({ message: 'Quiz App Server is Running' });
});

const server = app.listen(PORT, () => {
    console.log(`Server Running Successfully on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});