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

app.get("/subtract", (req, res) => {
    let num = Number(req.query.subtract_ms)
    if (Number.isNaN(num)) res.status(400).send("Bad request")
    let timestamp =  Date.now()
    let desc = String(req.query.description)
    let user = req.query.user

    timer.subtract(num, desc, timestamp)
    res.status(200).send("OK")
})

app.use(express.static('public'))

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;