import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const chatService = {
  async sendMessage(message, sessionId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message,
        sessionId
      });
      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Mesaj gönderilemedi');
    }
  },

  async checkHealth() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw new Error('Sunucu bağlantısı kurulamadı');
    }
  }
};

export const sendMessage = chatService.sendMessage;
export const checkHealth = chatService.checkHealth;
export default chatService; 