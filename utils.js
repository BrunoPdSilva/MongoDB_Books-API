import { ObjectId } from 'mongodb';

export function isIdValid(id, res) {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: 'ID inválida' });
    return;
  }
}
