import { ObjectId } from 'mongodb';
import { isIdValid } from './utils.js';
import { db } from './index.js';
import express from 'express';

export const router = express.Router();

// $ BUSCAR TODOS OS LIVROS $ //
router.get('/', (req, res) => {
  let books = [];

  const page = req.query.page || 0;
  const booksPerPage = 10;

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(booksPerPage * page)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => res.status(200).json(books))
    .catch(err => res.status(500).json(err));
});

// $ BUSCAR LIVRO POR ID $ //
router.get('/:id', (req, res) => {
  isIdValid(req.params.id, res);

  db.collection('books')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then(doc => {
      doc
        ? res.status(200).json(doc)
        : res.status(404).json({ error: 'Livro não encontrado.' });
    })
    .catch(err => res.status(500).json(err));
});

// $ ADICIONAR UM LIVRO $ //
router.post('/', (req, res) => {
  const newBook = req.body;

  db.collection('books')
    .insertOne(newBook)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});

// $ ATUALIZAR LIVRO POR ID $ //
router.put('/:id', (req, res) => {
  isIdValid(req.params.id, res);

  db.collection('books')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});

// $ DELETAR LIVRO POR ID $ //
router.delete('/:id', (req, res) => {
  isIdValid(req.params.id, res);

  db.collection('books')
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
});
