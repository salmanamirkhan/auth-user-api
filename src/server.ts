import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('hello from express');
  res.status(200);
  res.json({ message: 'hello' });
});

app.listen(4000, () => {
  console.log('server is running on port 4000');
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signIn);

export default app;
