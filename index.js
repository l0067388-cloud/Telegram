const express = require("express");

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { accountId } = req.body;

  console.log("Recibido:", accountId);

  res.send("ok");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
