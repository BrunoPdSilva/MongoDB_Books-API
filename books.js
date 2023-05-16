import { ObjectId } from 'mongodb';
import { db } from './index.js';
import express from 'express';

export const router = express.Router();

function isIdValid(id, res) {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválida' });
    return;
  }  
}

router.get('/', (req, res) => {
  let books = [];

  db.collection('books').find().sort({ author: 1 })
    .forEach(book => books.push(book))
    .then(() => res.status(200).json(books))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  isIdValid(req.params.id, res);
  
  db.collection('books')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then(doc => {
      doc
        ? res.status(200).json(doc)
        : res.status(404).json({ error: 'Livro não encontrado' });
    })
    .catch(err => res.status(500).json({ error: 'Could not fetch book' }));
});

router.post('/', (req, res) => {
  const newBook = req.body

  db.collection('books').insertOne(newBook)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: 'Falha ao adicionar livro' }));
})

router.put('/:id', (req, res) => {
  isIdValid(req.params.id, res);

  db.collection('books')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: 'Falha ao atualizar livro' }));
})

router.delete('/:id', (req, res) => {
  isIdValid(req.params.id, res);

  db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: 'Falha ao deletar livro' }));
})