import express from 'express';
import cors from 'cors';

import { connectToDB, getDB } from './db.js';
import { router as bookRoutes } from './books.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

export let db;

app.get('/', (req, res) => res.send("Hello World"))

connectToDB(err => {
  if (!err) {
    app.listen(PORT, () => console.log('listening on port 3000'));
    db = getDB();
  }
});

app.use('/books', bookRoutes);
