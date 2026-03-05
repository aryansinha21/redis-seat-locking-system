import express from 'express';
import { bookSeatController } from './booking.controller.js';
import { getSeatStatus } from './booking.model.js';

const router = express.Router();

router.post('/book/:seatId', bookSeatController);

router.get('/seats', async (req, res) => {
    try {
        const seats = {};
        for (let i = 1; i <= 20; i++) {
            seats[i] = await getSeatStatus(i.toString());
        }
        res.json(seats);
    } catch (error) {
        console.error('Seats endpoint error:', error);
        return res.status(500).json({
            message: "Failed to fetch seats. Please try again later."
        });
    }
});

export default router;