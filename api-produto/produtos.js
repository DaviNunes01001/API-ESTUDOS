const express = require("express");
const app = express();
const PORT = 3000;

// MIDDLEWARE: permite ler JSON no body das requisições
// Sem isso, req.body sempre será undefined no POST/PUT
app.use(express.json());

let produtos = [
  {
    id: 1,
    nome: "Notebook",
    preco: 3500.0,
    estoque: 10,
    categoria: "Informatica",
  },
  {
    id: 2,
    nome: "Mouse gamer",
    preco: 150.0,
    estoque: 50,
    categoria: "Acessorios",
  },
  {
    id: 3,
    nome: "Teclado Gamer",
    preco: 70.0,
    estoque: 5,
    categoria: "Acessorios",
  },
];

let procimoID = 4;

app.get("/", (req, res) => {
  res.send("rota funcionando com sucesso");
});

app.get("/produtos", (req, res) => {
  // Status 200 = OK (sucesso)
  res.status(200).json(produtos);
});

app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

app.get("/produtos/nome/:nomeid", (req, res) => {
  const nome = req.params.nomeid.toLowerCase();
  const produto = produtos.find((p) => p.nome.toLowerCase() === nome);

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

app.post("/produtos", (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;

  // VALIDAÇÃO: todos os campos são obrigatórios
  if (!nome || !preco || !estoque || !categoria) {
    return res.status(400).json({
      mensagem: "Campos obrigatórios: nome, preco, estoque, categoria",
    });
  }

  // Validação de valores negativos
  if (parseFloat(preco) <= 0) {
    return res.status(400).json({
      mensagem: "Preço deve ser maior que zero",
    });
  }

  if (parseInt(estoque) <= 0) {
    return res.status(400).json({
      mensagem: "estoque deve ser maior que zero",
    });
  }

  const novo = {
    id: procimoID++,
    nome,
    preco,
    estoque,
    categoria,
  };
  produtos.push(novo);
  res.status(201).json(novo); // 201 = create
});

app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const { nome, preco, estoque, categoria } = req.body;

  if (!nome || !preco || !estoque || !categoria) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios",
    });
  }

  // findIndex() retorna a posição no array (-1 se não achar)
  const index = produtos.findIndex((p) => p.id === id);
  if (index !== -1) {
    // Substituir o objeto mantendo o ID original
    produtos[index] = {
      id,
      nome,
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      categoria,
    };
    res.status(200).json(produtos[index]);
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`,
    });
  }
});

app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);
  if (index !== -1) {
    
    produtos.splice(index, 1);// splice(posicao, quantidade) — remove 1 item na posição
    res.status(200).json({
      mensagem: `Produto ${id} removido com sucesso`,
    });
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando servidor em http://localhost:${PORT}`);
});
