import express from 'express';
import cors from 'cors';

import { connectToDB, getDB } from './db.js';
import { router as bookRoutes } from './books.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

let db

connectToDB(err => {
  if(!err) {
    app.listen(PORT, () => console.log('listening on port 3000'));
    db = getDB();
  } 
})


app.get('/books', (req, res) => {
  let books = [];

  db.collection('books').find().sort({ author: 1 }).forEach(book => books.push(book))
    .then(() => res.status(200).json(books))
    .catch(err => res.status(500).json(err))
    .finally(() => console.log('Finished'))
});

