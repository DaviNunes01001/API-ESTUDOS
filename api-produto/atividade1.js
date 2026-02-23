const express = require("express");
const app = express();

let musicas = [
  {
    id: 1,
    name: "jomes hunt",
    autor: "jomes hunt",
    album: "blue pocket",
    price: 120.0,
  },
  {
    id: 2,
    name: "michael jackson",
    autor: "michael jackson",
    album: "Thriller",
    price: 150.0,
  },
  {
    id: 3,
    name: "tylor swift",
    autor: "tylor swift",
    album: "evermore",
    price: 110.0,
  },
];

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

app.listen(3000, () => console.log("ready"));
