import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  position: relative;
`;

const Input = styled.textarea`
  flex: 1;
  min-height: 48px;
  max-height: 120px;
  padding: 14px 20px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
    background: rgba(255, 255, 255, 1);
  }
  
  &:disabled {
    background-color: rgba(248, 250, 252, 0.8);
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
  
  @media (max-width: 768px) {
    min-height: 44px;
    padding: 12px 16px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    min-height: 40px;
    padding: 10px 14px;
    font-size: 13px;
  }
`;

const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.95);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
  
  &:hover:not(:disabled) svg {
    transform: translateX(2px);
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      // Tüm satır sonlarını, fazla boşlukları temizle ve tek satır yap
      const cleanMessage = message
        .replace(/\r?\n/g, ' ')  // Satır sonlarını boşlukla değiştir
        .replace(/\s+/g, ' ')    // Birden fazla boşluğu tek boşluğa çevir
        .trim();                 // Baş ve sondaki boşlukları kaldır
      onSendMessage(cleanMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled) {
        // Tüm satır sonlarını, fazla boşlukları temizle ve tek satır yap
        const cleanMessage = message
          .replace(/\r?\n/g, ' ')  // Satır sonlarını boşlukla değiştir
          .replace(/\s+/g, ' ')    // Birden fazla boşluğu tek boşluğa çevir
          .trim();                 // Baş ve sondaki boşlukları kaldır
        onSendMessage(cleanMessage);
        setMessage('');
      }
    }
  };

  const handleInputChange = (e) => {
    // Satır sonlarını anında temizle
    const cleanValue = e.target.value.replace(/\r?\n/g, ' ');
    setMessage(cleanValue);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onKeyDown={(e) => {
            // Enter tuşunu engelle, sadece Shift+Enter'a izin ver
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
            }
          }}
          placeholder="Mesajınızı yazın..."
          disabled={disabled}
          rows={1}
        />
        <SendButton 
          type="submit" 
          disabled={!message.trim() || disabled}
          title="Gönder"
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </SendButton>
      </InputContainer>
    </form>
  );
};

export default MessageInput; 