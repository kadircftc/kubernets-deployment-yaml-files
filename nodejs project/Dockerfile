# Node.js tabanlı bir image kullan
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /usr/src/app

# Bağımlılıkları yüklemeden önce package.json dosyasını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulama için portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
