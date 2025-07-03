const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: {
      error: message
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// API rate limiter
const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 dakika
  100, // maksimum 100 istek
  'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.'
);

// Chat rate limiter (daha sıkı)
const chatLimiter = createRateLimiter(
  60 * 1000, // 1 dakika
  10, // maksimum 10 mesaj
  'Çok hızlı mesaj gönderiyorsunuz. Lütfen bekleyin.'
);

// Input validation middleware
const validateMessage = (req, res, next) => {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Geçersiz mesaj formatı' });
  }
  
  if (message.trim().length === 0) {
    return res.status(400).json({ error: 'Mesaj boş olamaz' });
  }
  
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Mesaj çok uzun (maksimum 1000 karakter)' });
  }
  
  // Zararlı içerik kontrolü
  const harmfulPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi
  ];
  
  for (const pattern of harmfulPatterns) {
    if (pattern.test(message)) {
      return res.status(400).json({ error: 'Geçersiz içerik tespit edildi' });
    }
  }
  
  next();
};

// Session validation
const validateSession = (req, res, next) => {
  const { sessionId } = req.body;
  
  if (sessionId && typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Geçersiz session ID' });
  }
  
  next();
};

module.exports = {
  apiLimiter,
  chatLimiter,
  validateMessage,
  validateSession
}; 