import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import router from './routes/BikeRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Exporting the handler expected by Vercel
module.exports = app;
module.exports.handler = serverless(app);
