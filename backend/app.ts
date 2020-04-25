import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MONGODB_URL } from './config';
import { todoRouter } from './routes/todo.route';
import { userRouter } from './routes/user.route';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ');
  },
  (error: any) => {
    console.log('Could not connected to database : ' + error);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/misc-app')));
app.use('/', express.static(path.join(__dirname, 'dist/misc-app')));
app.use('/api', todoRouter);
app.use('/api', userRouter);

const port = process.env.EXPRESS_PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port);
})

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});
