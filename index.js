const express = require("express");
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const app = express();
app.use(express.json());

const apiId = 34958364;
const apiHash = 95ce2eb29459e2628874d2cb83f6c09b;
const stringSession = new StringSession("");

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

(async () => {
  await client.start({
    phoneNumber: async () => await input.text("Número: "),
    password: async () => await input.text("Password (si tienes): "),
    phoneCode: async () => await input.text("Código: "),
  });

  console.log("Telegram conectado");

  console.log("SESSION STRING:");
  console.log(client.session.save());
})();

app.post("/send", async (req, res) => {
  const { accountId } = req.body;

  try {
    await client.sendMessage("NOMBRE_DEL_BOT", {
      message: accountId,
    });

    console.log("Enviado a Telegram:", accountId);
    res.send("ok");
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo");
});
