import 'dotenv/config.js';
// mongodb connection via mongoose
import './db.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router.js';
import rateLimit from 'express-rate-limit';
import passport from 'passport';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,                 // Limits each IP to 10 requests per 'window' (per minute here)
});

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(limiter);
app.use(passport.initialize());

// Routing
app.get('/', (req, res) => {
  res.send('Node.js Server is live!');
});

app.use('/v1', apiRouter);

export default app;