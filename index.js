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
const apiHash = "95ce2eb29459e2628874d2cb83f6c09b"; // 🔴 cambia si ya lo regeneraste
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTgBuw8q1TvqjiUDyW8VeVFEa36Sg8gajmzjRvniN0PIhauPnzOwYaQ6gfIwmHZnvEphwZ38NFuxC6eXfzMYJjhyzll6oRIF+YpMvTXC+IkYMNcimM15eg2T4MMO1bNDeAzr7E2YQJaASlQfUqNu3+5Ae06omxKoEDIN3bFQgpt+G5hLRiW+TgwUCuJrjriAf2Tk5tSPCaAKzx2Cn6AD5sBRUjt23e7tSJCvh0Cr0FfKeD+P4u9ww0lKhaq2CNGJxgxdkycp0BIMpz8p1qedhJCEHMgFuj4kjY294OSu+5KUZyiUXJ2PYV7Em4SeCBKJXkjRAUiFHMsZ8aHk0sdmFKmA48M="); // 🔴 pega tu session

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
    await client.sendMessage("Raika_CheckBot", {
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
