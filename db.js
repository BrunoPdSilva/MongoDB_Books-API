import { MongoClient } from 'mongodb';

let dbConnection;

const uri = 'mongodb://127.0.0.1:27017/bookstore';

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
