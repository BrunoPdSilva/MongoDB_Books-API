import { db } from './index.js';
import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
  let books = [];

  db.collection('books').find().sort({ author: 1 }).forEach(book => books.push(book))
    .then(() => res.status(200).json(books))
    .catch(err => res.status(500).json(err))
    .finally(() => console.log('Finished'))
})