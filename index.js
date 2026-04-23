const express = require("express");
const cors = require("cors");

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const app = express();

// 🔥 CORS (IMPORTANTE PARA BASE44)
app.use(cors());
app.use(express.json());

// 🔥 TUS DATOS
const apiId = 34958364;
const apiHash = "TU_API_HASH"; // 🔴 cambia si ya lo regeneraste
const stringSession = new StringSession("TU_SESSION_AQUI"); // 🔴 pega tu session

let client;

// 🔥 INICIAR TELEGRAM
async function iniciarTelegram() {
  try {
    client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.connect();
    console.log("✅ Telegram conectado");
  } catch (err) {
    console.log("❌ Error Telegram:", err.message);
  }
}

iniciarTelegram();

// 🔹 TEST
app.get("/", (req, res) => {
  res.send("Servidor activo 🚀");
});

// 🔹 ENDPOINT QUE USA BASE44
app.post("/send", async (req, res) => {
  console.log("BODY COMPLETO:", req.body);

  const { accountId } = req.body;

  if (!client) {
    return res.status(500).send("Telegram no conectado");
  }

  try {
    await client.sendMessage("NOMBRE_DEL_BOT", {
      message: accountId,
    });

    console.log("📨 Enviado:", accountId);
    res.send("ok");
  } catch (err) {
    console.log("❌ Error enviando:", err.message);
    res.status(500).send("error");
  }
});

// 🔥 PUERTO (RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Servidor corriendo en puerto", PORT);
});
