const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor activo 🚀");
});

app.post("/send", (req, res) => {
  console.log("Recibido:", req.body.accountId);
  res.send("ok");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
