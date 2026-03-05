import { bookSeatService } from './booking.service.js';

const bookSeatController = async (req, res) => {
    try {
        const seatId = req.params.seatId;

        if (!seatId || isNaN(seatId)) {
            return res.status(400).json({
                message: "Invalid seat ID. Please provide a valid number between 1-20."
            });
        }

        const result = await bookSeatService(seatId);
        return res.status(result.status).json({ message: result.message });
        
    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({
            message: "An error occurred while processing your booking. Please try again."
        });
    }
};

export { bookSeatController };