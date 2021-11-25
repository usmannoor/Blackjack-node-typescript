import bodyParser from 'body-parser';
import express from 'express';
import connectDB from '../config/database';
import Deck from './routes/deck';

const app = express();

// Express configuration
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// initialize routes
app.use('/', Deck)

// Connect to MongoDB
connectDB();

// Test API
app.get('/', (_req, res) => {
  res.send('API Running');
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
