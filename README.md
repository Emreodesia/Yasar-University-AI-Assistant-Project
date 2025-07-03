# 🤖 Yaşar Üniversitesi Yapay Zeka Asistanı

Yaşar Üniversitesi için geliştirilmiş, kullanıcı dostu ve doğal dil işleme yeteneklerine sahip modern bir yapay zeka asistanı.

## 🚀 Özellikler

- **Doğal Dil İşleme**: Kullanıcı mesajlarını anlayıp uygun cevaplar üretir
- **Üniversite Odaklı**: Yaşar Üniversitesi ile ilgili tüm konularda yardım sağlar
- **Akademik Destek**: Öğrenci ve akademik personel için özel destek
- **Context Awareness**: Konuşma bağlamını hatırlar ve uygun cevaplar verir
- **Modern UI/UX**: Responsive ve kullanıcı dostu arayüz
- **Real-time Communication**: Socket.IO ile gerçek zamanlı iletişim
- **Session Management**: Kullanıcı oturumlarını yönetir

## 🛠️ Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **Natural** - Natural language processing
- **UUID** - Unique identifier generation

### Frontend
- **React** - UI library
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time client

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd chatbot
```

2. Environment variables dosyasını oluşturun:
```bash
# .env dosyası oluşturun
cp env.example .env
```

3. `.env` dosyasını düzenleyin ve Gemini API key'inizi ekleyin:
```bash
# .env dosyasını açın ve API key'inizi ekleyin
GEMINI_API_KEY=your_actual_api_key_here
```

**Gemini API Key Nasıl Alınır:**
- [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
- Google hesabınızla giriş yapın
- "Create API Key" butonuna tıklayın
- Oluşturulan API key'i `.env` dosyasına ekleyin

4. Bağımlılıkları yükleyin:
```bash
npm install
```

5. Sunucuyu başlatın:
```bash
# Geliştirme modu
npm run dev

# Production modu
npm start
```

Backend sunucusu `http://localhost:5000` adresinde çalışacaktır.

### Frontend Kurulumu

1. Frontend klasörüne gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

Frontend uygulaması `http://localhost:3000` adresinde çalışacaktır.

## 🎯 Kullanım

1. Tarayıcınızda `http://localhost:3000` adresine gidin
2. Yaşar Üniversitesi Yapay Zeka Asistanı ile sohbet etmeye başlayın
3. Önerilen butonları kullanarak hızlı seçimler yapın

### Desteklenen Konular

- **Selamlaşma**: "Merhaba", "Selam", "Hey" vb.
- **Üniversite Bilgileri**: "Yaşar Üniversitesi", "Kampüs", "Bölümler" vb.
- **Akademik Destek**: "Ders", "Sınav", "Ödev", "Öğrenci" vb.
- **İletişim**: "Telefon", "Email", "Adres" vb.
- **Teşekkür**: "Teşekkür", "Sağol" vb.
- **Vedalaşma**: "Görüşürüz", "Hoşça kal" vb.

## 🔧 API Endpoints

### POST /api/chat
Mesaj gönderme endpoint'i

**Request Body:**
```json
{
  "message": "Merhaba",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "sessionId": "generated-session-id",
  "message": {
    "id": "message-id",
    "text": "Merhaba! Ben Yaşar Üniversitesi Yapay Zeka Asistanı. Size nasıl yardımcı olabilirim? 😊",
    "sender": "bot",
    "timestamp": "2023-01-01T00:00:00.000Z",
    "suggestions": ["Üniversite Bilgileri", "Akademik Destek", "İletişim"]
  },
  "context": {}
}
```

### GET /api/health
Sunucu sağlık kontrolü

**Response:**
```json
{
  "status": "OK",
  "message": "Yaşar Üniversitesi Yapay Zeka Asistanı çalışıyor"
}
```

## 🎨 Özelleştirme

### Bilgi Tabanı Genişletme

`services/chatbotService.js` dosyasındaki `knowledgeBase` objesini düzenleyerek yeni konular ve cevaplar ekleyebilirsiniz:

```javascript
this.knowledgeBase = {
  yeni_konu: {
    patterns: ['anahtar kelime1', 'anahtar kelime2'],
    responses: [
      'Cevap 1',
      'Cevap 2',
      'Cevap 3'
    ]
  }
};
```

### UI Özelleştirme

Frontend bileşenlerini `frontend/src/components/` klasöründe düzenleyebilirsiniz. Styled Components kullanılarak yazılmıştır.

### Logo Değiştirme

`frontend/public/logo.png` dosyasını Yaşar Üniversitesi logosu ile değiştirin.

## 🚀 Production Deployment

### Backend
```bash
# Production build
npm run build
npm start
```

### Frontend
```bash
# Production build
npm run build
```

Build edilen dosyalar `build/` klasöründe oluşacaktır.

## 🔒 Güvenlik

### Environment Variables
Bu proje hassas bilgileri environment variables kullanarak güvenli bir şekilde saklar:

- **GEMINI_API_KEY**: Gemini AI API anahtarı
- **PORT**: Sunucu portu (varsayılan: 5000)
- **CORS_ORIGIN**: CORS ayarları
- **NODE_ENV**: Çalışma ortamı

### Güvenlik Önlemleri
- API key'ler asla kod içinde saklanmaz
- `.env` dosyası `.gitignore`'da yer alır
- Rate limiting aktif
- Input validation mevcut
- CORS koruması aktif

### Production Deployment
Production ortamında:
1. Güçlü API key'ler kullanın
2. HTTPS kullanın
3. Environment variables'ları güvenli bir şekilde ayarlayın
4. Rate limiting ayarlarını gözden geçirin

## 📝 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Yaşar Üniversitesi ile iletişime geçmek için:
- 📞 Telefon: 0232 411 50 00
- 📧 Email: info@yasar.edu.tr
- 📍 Adres: Üniversite Caddesi, No: 37-39, Bornova, İzmir

Sorularınız için issue açabilir veya iletişime geçebilirsiniz. 