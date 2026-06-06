import express from 'express';
import itemRoutes from './routes/itemRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();

app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);

app.get("/hi", (req, res) => {
    res.send("Hello World!")
})

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;