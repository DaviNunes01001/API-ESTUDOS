const express = require("express");
const app = express();
const PORT = 3000;

// MIDDLEWARE: permite ler JSON no body das requisições
// Sem isso, req.body sempre será undefined no POST/PUT
app.use(express.json());

let produtos = [
  { id: 1, nome: "Notebook", preco: 3500.0 },
  { id: 2, nome: "Mouse gamer", preco: 150.0 },
];

let procimoID = 3;

app.get("/", (req, res) => {
  res.send('rota funcionando com sucesso')
});

app.get("/produtos", (req, res) => {
  // Status 200 = OK (sucesso)
  res.status(200).json(produtos);
});

app.listen(PORT, app, () => {
  console.log(`Rodando servidor em http://localhost:${PORT}`);
});
