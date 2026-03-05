import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import bookingRoutes from "./modules/booking/booking.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', bookingRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: "An unexpected error occurred. Please try again."
    });
});

export default app;