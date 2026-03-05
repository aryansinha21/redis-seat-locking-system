import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import bookingRoutes from "./modules/booking/booking.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).send('Authentication required');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const expectedUsername = process.env.AUTH_USERNAME || 'admin';
    const expectedPassword = process.env.AUTH_PASSWORD || 'password';

    if (username === expectedUsername && password === expectedPassword) {
        return next();
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).send('Invalid credentials');
    }
};

app.use(auth);

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