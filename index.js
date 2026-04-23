const express = require("express");

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { accountId } = req.body;

  console.log("Recibido:", accountId);

  res.send("ok");
});

app.listen(3000, () => {
  console.log("Servidor listo");
});