const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Teste de rota Raiz');
});
//rota raiz
app.get('/about', (req, res) => {
  res.send('teste de rota about');
});
//rota de contado que responde com uma informação de contato
app.get('/contact', (req, res) => {
  res.send('contadode suporte = suporte@exemplo.com');
});

app.listen(PORT, app, () => {
  console.log(`servirdor rodando em http://localhost:${PORT}`);
});
