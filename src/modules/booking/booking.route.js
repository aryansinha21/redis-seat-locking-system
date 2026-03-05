import express from 'express';
import { bookSeatController } from './booking.controller.js';
import { getSeatStatus } from './booking.model.js';

const router = express.Router();

router.post('/book/:seatId', bookSeatController);

router.get('/seats', async (req, res) => {
    const seats = {};
    for (let i = 1; i <= 20; i++) {
        seats[i] = await getSeatStatus(i.toString());
    }
    res.json(seats);
});

export default router;