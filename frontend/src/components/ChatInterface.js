import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SuggestionButtons from './SuggestionButtons';
import { sendMessage } from '../services/chatService';

const ChatInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  animation: fadeInScale 0.8s ease-out;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const InputContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  padding: 20px;
  position: relative;
  animation: slideInFromBottom 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #64748b;
  font-size: 0.9rem;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: #64748b;
  font-size: 0.9rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 16px;
  margin: 8px 0;
  max-width: 120px;
  animation: slideInFromLeft 0.5s ease-out;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  
  .dots {
    display: flex;
    margin-left: 8px;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3b82f6;
    margin: 0 2px;
    animation: typing 1.4s infinite ease-in-out;
  }
  
  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  
  @keyframes typing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
`;

const ChatInterface = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Hoş geldin mesajı
    if (sessionId && messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        text: 'Merhaba! Ben Yaşar Üniversitesi Yapay Zeka Asistanı. Size nasıl yardımcı olabilirim? 😊',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Üniversite Bilgileri', 'Akademik Destek', 'İletişim']
      };
      setMessages([welcomeMessage]);
      setSuggestions(welcomeMessage.suggestions);
    }
  }, [sessionId]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setSuggestions([]);

    try {
      const response = await sendMessage(messageText, sessionId);
      
      const botMessage = {
        id: response.message.id,
        text: response.message.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.message.suggestions || []
      };

      setMessages(prev => [...prev, botMessage]);
      setSuggestions(botMessage.suggestions);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      
      const errorMessage = {
        id: Date.now().toString(),
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Tekrar dene', 'Yardım al']
      };

      setMessages(prev => [...prev, errorMessage]);
      setSuggestions(errorMessage.suggestions);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <ChatInterfaceContainer>
      <MessagesContainer>
        <MessageList messages={messages} />
        {isLoading && (
          <TypingIndicator>
            Asistan yazıyor
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </TypingIndicator>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      {suggestions.length > 0 && (
        <SuggestionButtons 
          suggestions={suggestions} 
          onSuggestionClick={handleSuggestionClick}
        />
      )}
      
      <InputContainer>
        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
        />
      </InputContainer>
    </ChatInterfaceContainer>
  );
};

export default ChatInterface; 