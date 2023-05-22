import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

let dbConnection;
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s4mfrst.mongodb.net/?retryWrites=true&w=majority`

export function connectToDB(callback) {
  MongoClient.connect(uri)
    .then(client => {
      dbConnection = client.db();
      return callback();
    })
    .catch(error => {
      console.log(error);
      return callback(error);
    });
}

export const getDB = () => dbConnection;
