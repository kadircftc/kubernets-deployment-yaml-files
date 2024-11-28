const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// JSON verileri almak için middleware
app.use(express.json());

// MongoDB bağlantısı için ortam değişkenleri kullanma
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = 'mongodb-service';
const MONGO_PORT = 27017;
const MONGO_DB = 'users';

// MongoDB bağlantı URI'si
const mongoUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
console.log(mongoUri);

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye bağlanıldı."))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));

// Kullanıcı şeması ve modeli
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

// API endpoint'leri
// Kullanıcı eklemek için POST isteği
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Kullanıcı ekleme hatası:", err);
    res.status(400).json({ message: "Kullanıcı eklenirken bir hata oluştu.", error: err });
  }
});

// Kullanıcıları listelemek için GET isteği
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Kullanıcıları getirirken hata oluştu:", err);
    res.status(500).json({ message: "Kullanıcılar alınırken bir hata oluştu.", error: err });
  }
});

// Sunucuyu başlatma
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
