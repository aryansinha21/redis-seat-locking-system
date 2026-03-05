import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    status: { type: String, default: 'available' }
});

const Seat = mongoose.model('Seat', seatSchema);

const initializeSeats = async () => {
    const seats = ['1', '2', '3', '4', '5'];
    for (const id of seats) {
        await Seat.findOneAndUpdate(
            { id },
            { id, status: 'available' },
            { upsert: true, returnDocument: 'after' }
        );
    }
};

const getSeatStatus = async (seatId) => {
    const seat = await Seat.findOne({ id: seatId });
    return seat ? seat.status : null;
};

const bookSeat = async (seatId) => {
    await Seat.findOneAndUpdate(
        { id: seatId },
        { status: 'booked' }
    );
};

export { initializeSeats, getSeatStatus, bookSeat };