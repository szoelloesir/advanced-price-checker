import express from 'express';
import stock from './app/routes/stock';

const app = express();

const PORT = 3000;

app.use('/stock', stock);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});