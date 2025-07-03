const axios = require('axios');

class GeminiService {
  constructor() {
    // API key'i environment variable'dan al
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required. Please check your .env file.');
    }
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async generateResponse(userMessage, context = '') {
    try {
      const prompt = this.buildPrompt(userMessage, context);
      
      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 saniye timeout
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        return response.data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      
      // API key hatası kontrolü
      if (error.response?.status === 400) {
        throw new Error('AI servisi yapılandırma hatası. Lütfen daha sonra tekrar deneyin.');
      }
      
      if (error.response?.status === 403) {
        throw new Error('AI servisi erişim hatası. Lütfen daha sonra tekrar deneyin.');
      }
      
      throw new Error('AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
    }
  }

  buildPrompt(userMessage, context) {
    const systemPrompt = `Sen Yaşar Üniversitesi'nin yapay zeka asistanısın. 
    
Görevin:
- Öğrencilere ve personel üyelerine Yaşar Üniversitesi hakkında bilgi vermek
- Akademik konularda yardım etmek
- Üniversite süreçleri hakkında rehberlik yapmak
- Türkçe olarak nazik ve profesyonel cevaplar vermek
- Kısa, net ve yararlı bilgiler sunmak

Yaşar Üniversitesi Bilgileri:
- Adres: Üniversite Caddesi, No: 37-39, Bornova, İzmir
- Telefon: 0232 411 50 00
- Email: info@yasar.edu.tr
- Web: www.yasar.edu.tr

Kurallar:
- Her zaman nazik ve yardımsever ol
- Türkçe cevap ver
- Kısa ve öz tut (maksimum 3-4 cümle)
- Emoji kullan (😊, 📚, 🎓, 📞, 📧)
- Yaşar Üniversitesi odaklı kal
- Öğrenci dostu dil kullan

Kullanıcı mesajı: ${userMessage}

${context ? `Önceki konuşma bağlamı: ${context}` : ''}

Lütfen uygun bir cevap ver:`;

    return systemPrompt;
  }

  // Güvenlik için API key'i gizle
  getApiKey() {
    return '***HIDDEN***';
  }
}

module.exports = GeminiService; 