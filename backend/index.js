import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksroute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//middleware for handling cors policy
// method 1:allow all origins with all default cors(*)
app.use(cors());

//method 2:allow custom origins
// app.use(cors({
//   origin:'http://localhost:3000',
//   methods:['GET','PUT','POST','DELETE'],
//   allowedHeaders:['content-type']
// }))

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('welcome to project');
})

app.use('/books',booksroute);


mongoose.connect(mongoDBUrl).then(() => { 
  console.log('connected to database')
  app.listen(PORT, () => {
    console.log(`listening to the ${PORT}`);
  });
}).catch((error) => {
  console.log(error); 
})
