const express = require("express");
const app = express();

let musicas = [
  {
    id: 1,
    nome: "Hold On",
    autor: "Luke Grimes ",
    Link: "https://www.youtube.com/watch?v=6u-vlqfTnXI&list=RD6u-vlqfTnXI&start_radio=1",
  },
  {
    id: 2,
    nome: "Dance the Night Away",
    autor: "Shane Smith & the Saints",
    Link: "https://www.youtube.com/watch?v=fiijmIQEQB4&list=PLjlVuwzeqKZXUTkaI-3QQ_WG_IoccXog-&index=2",
  },
  {
    id: 3,
    nome: "Shades of Gray",
    autor: "Robert Earl Keen",
    Link: "https://www.youtube.com/watch?v=6u-vlqfTnXI&list=RD6u-vlqfTnXI&start_radio=1",
  },
  {
    id: 4,
    nome: "Mule Skinner Blues",
    autor: "Dolly Parton ",
    Link: "https://www.youtube.com/watch?v=6u-vlqfTnXI&list=RD6u-vlqfTnXI&start_radio=1",
  },
];

let proximoId = 5;

app.get("/", (req, res) => {
  res.send("rota funcionando com sucesso");
});

app.get("/musicas", (req, res) => {
  res.status(200).json(musicas);
});

app.get("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const musica = musicas.find((m) => m.id === id);

  musica
    ? res.status(200).json(musica)
    : res
        .status(404)
        .json({ message: "esta musica nao pode ser encontrada :(" });
});

app.get("/musicas/nome/:nomeid", (req, res) => {
  const id = req.params.nomeid;
  const musica = musicas.find((m) => m.nome === id);

  if (musica) {
    res.status(200).json(musica);
  } else {
    res.status(404).json({ mensagem: "musica não encontrada" });
  }
});

app.post("/musicas", (req, res) => {
  const { nome, autor, link } = req.body;

  if (!nome || !autor || !link) {
    return res.status(400).json({
      mensagem: "Campos em vazio",
    });
  }

  const novo = {
    id: proximoId++,
    nome,
    autor,
    link
  };
  musicas.push(novo);
  res.status(201).json(novo);
});

app.listen(3000, () =>
  console.log(`Servidor rodando em http://localhost:3000`),
);
