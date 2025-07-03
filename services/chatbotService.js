const natural = require('natural');
const { v4: uuidv4 } = require('uuid');
const GeminiService = require('./geminiService');

class ChatbotService {
  constructor() {
    this.sessions = new Map();
    this.tokenizer = new natural.WordTokenizer();
    this.geminiService = new GeminiService();
    
    // Temel bilgi tabanı - fallback için
    this.knowledgeBase = {
      greetings: {
        patterns: ['merhaba', 'selam', 'hey', 'hi', 'hello', 'günaydın', 'iyi günler'],
        responses: [
          'Merhaba! Ben Yaşar Üniversitesi Yapay Zeka Asistanı. Size nasıl yardımcı olabilirim? 😊',
          'Selam! Yaşar Üniversitesi Yapay Zeka Asistanı buradayım. Bugün size nasıl yardımcı olabilirim?',
          'Merhaba! Hoş geldiniz, Yaşar Üniversitesi Yapay Zeka Asistanı olarak size hizmet veriyorum.'
        ]
      },
      thanks: {
        patterns: ['teşekkür', 'sağol', 'thanks', 'thank you', 'teşekkürler'],
        responses: [
          'Rica ederim! Başka bir konuda yardıma ihtiyacınız olursa buradayım. 😊',
          'Ne demek! Size yardımcı olabildiysem ne mutlu bana.',
          'Rica ederim! Başka sorularınız varsa sormaktan çekinmeyin.'
        ]
      },
      goodbye: {
        patterns: ['görüşürüz', 'hoşça kal', 'bye', 'goodbye', 'çıkış', 'kapat'],
        responses: [
          'Görüşmek üzere! İyi günler dilerim. 👋',
          'Hoşça kalın! Tekrar görüşmek üzere.',
          'İyi günler! Başka bir zaman tekrar bekleriz.'
        ]
      }
    };
  }

  // Mesaj işleme ana fonksiyonu
  async processMessage(message, sessionId) {
    if (!sessionId) {
      sessionId = uuidv4();
    }

    // Session'ı başlat veya güncelle
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        messages: [],
        context: {},
        createdAt: new Date()
      });
    }

    const session = this.sessions.get(sessionId);
    const userMessage = {
      id: uuidv4(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    session.messages.push(userMessage);

    // Mesajı analiz et ve cevap oluştur
    const response = await this.generateResponse(message, session);
    
    const botMessage = {
      id: uuidv4(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: response.suggestions || []
    };

    session.messages.push(botMessage);

    return {
      sessionId,
      message: botMessage,
      context: session.context
    };
  }

  // Cevap oluşturma fonksiyonu - Gemini API ile
  async generateResponse(message, session) {
    const lowerMessage = message.toLowerCase();
    
    // Basit selamlaşma, teşekkür ve vedalaşma için fallback
    const intent = this.detectIntent(lowerMessage);
    
    if (intent.type !== 'unknown') {
      return {
        text: this.getRandomResponse(this.knowledgeBase[intent.type].responses),
        suggestions: this.getSuggestions(intent.type)
      };
    }

    // Gemini API'yi kullan
    try {
      const context = this.buildContext(session);
      const aiResponse = await this.geminiService.generateResponse(message, context);
      
      return {
        text: aiResponse,
        suggestions: this.getSmartSuggestions(message, aiResponse)
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback cevap
      return {
        text: 'Üzgünüm, şu anda AI servisi kullanılamıyor. Size nasıl yardımcı olabilirim?',
        suggestions: ['Üniversite Bilgileri', 'Akademik Destek', 'İletişim']
      };
    }
  }

  // Intent tespiti
  detectIntent(message) {
    let bestMatch = { type: 'unknown', score: 0 };

    for (const [intentType, intentData] of Object.entries(this.knowledgeBase)) {
      const score = this.calculateSimilarity(message, intentData.patterns);
      if (score > bestMatch.score) {
        bestMatch = { type: intentType, score };
      }
    }

    return bestMatch.score > 0.3 ? bestMatch : { type: 'unknown', score: 0 };
  }

  // Benzerlik hesaplama
  calculateSimilarity(message, patterns) {
    let maxScore = 0;
    
    for (const pattern of patterns) {
      if (message.includes(pattern)) {
        const score = pattern.length / message.length;
        maxScore = Math.max(maxScore, score);
      }
    }
    
    return maxScore;
  }

  // Context oluşturma
  buildContext(session) {
    if (session.messages.length <= 2) return '';
    
    const recentMessages = session.messages.slice(-4); // Son 4 mesaj
    return recentMessages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
  }

  // Akıllı öneriler
  getSmartSuggestions(message, aiResponse) {
    const lowerMessage = message.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();
    
    if (lowerMessage.includes('üniversite') || lowerMessage.includes('yaşar')) {
      return ['Kampüs Bilgileri', 'Bölümler', 'Öğrenci Hayatı'];
    }
    
    if (lowerMessage.includes('akademik') || lowerMessage.includes('ders') || lowerMessage.includes('sınav')) {
      return ['Ders Programı', 'Sınav Takvimi', 'Öğrenci İşleri'];
    }
    
    if (lowerMessage.includes('iletişim') || lowerMessage.includes('telefon') || lowerMessage.includes('email')) {
      return ['Telefon', 'Email', 'Adres'];
    }
    
    return ['Üniversite Bilgileri', 'Akademik Destek', 'İletişim'];
  }

  // Temel öneriler
  getSuggestions(intentType) {
    switch (intentType) {
      case 'greetings':
        return ['Üniversite Bilgileri', 'Akademik Destek', 'İletişim'];
      case 'thanks':
        return ['Başka soru', 'Yardım al'];
      case 'goodbye':
        return ['Tekrar görüşürüz'];
      default:
        return ['Üniversite Bilgileri', 'Akademik Destek', 'İletişim'];
    }
  }

  // Rastgele cevap seçimi
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Session temizleme (eski session'ları sil)
  cleanupOldSessions() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.createdAt < oneHourAgo) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

module.exports = ChatbotService; 