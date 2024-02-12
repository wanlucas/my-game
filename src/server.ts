import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Aberto na porta ${port}`);
});