import express from 'express';
import itemRoutes from './routes/itemRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import {Timer} from './timer.ts'

const app = express();

app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

app.get("/hi", (req, res) => {
    res.send("Hello World!")
})

let timer = new Timer()

app.get("/timer", (req, res) => {
    res.send(timer.time_remaining_ms)
})

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;