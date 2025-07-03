require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const ChatbotService = require('./services/chatbotService');
const { apiLimiter, chatLimiter, validateMessage, validateSession } = require('./middleware/security');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Trust proxy ayarı - rate limiting için gerekli
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Güvenlik middleware'leri
app.use('/api/', apiLimiter);

// Chatbot service instance
const chatbotService = new ChatbotService();

// REST API endpoints
app.post('/api/chat', chatLimiter, validateMessage, validateSession, async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    const response = await chatbotService.processMessage(message, sessionId);
    res.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Yaşar Üniversitesi Yapay Zeka Asistanı çalışıyor',
    timestamp: new Date().toISOString()
  });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı:', socket.id);

  socket.on('send_message', async (data) => {
    try {
      if (!data.message || !data.message.trim()) {
        socket.emit('error', { message: 'Mesaj boş olamaz' });
        return;
      }
      
      if (data.message.length > 1000) {
        socket.emit('error', { message: 'Mesaj çok uzun (maksimum 1000 karakter)' });
        return;
      }
      
      const response = await chatbotService.processMessage(data.message, data.sessionId);
      socket.emit('receive_message', response);
    } catch (error) {
      console.error('Socket Error:', error);
      socket.emit('error', { message: 'Mesaj işlenirken hata oluştu' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`🤖 Yaşar Üniversitesi Yapay Zeka Asistanı aktif`);
  console.log(`🌐 Frontend: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  console.log(`🔒 Güvenlik middleware'leri aktif`);
}); 