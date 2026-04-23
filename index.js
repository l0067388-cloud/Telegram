const express = require("express");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const app = express();
app.use(express.json());

// 🔥 TUS DATOS
const apiId = 34958364; // <-- TU API ID
const apiHash = "95ce2eb29459e2628874d2cb83f6c09b";
const stringSession = new StringSession("PEGA_AQUI_TU_SESSION"); // 🔥 IMPORTANTE

// 🔥 CLIENTE TELEGRAM
const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

// 🔥 CONECTAR UNA SOLA VEZ
(async () => {
  await client.connect();
  console.log("Telegram conectado");
})();

// 🔹 TEST
app.get("/", (req, res) => {
  res.send("Servidor activo 🚀");
});

// 🔹 ENDPOINT
app.post("/send", async (req, res) => {
  const { accountId } = req.body;

  try {
    await client.sendMessage("NOMBRE_DEL_BOT", {
      message: accountId,
    });

    console.log("Enviado:", accountId);
    res.send("ok");
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("error");
  }
});

// 🔥 PUERTO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
