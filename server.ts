import express from 'express';
import stock from './app/routes/stock';
import swaggerSpec from './swagger';
import swaggerUi from 'swagger-ui-express';


const app = express();

const PORT = 3000;

app.use('/stock', stock);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});