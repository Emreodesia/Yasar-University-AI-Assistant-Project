import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  margin-bottom: 16px;
  animation: ${props => props.sender === 'user' ? 'slideInRight' : 'slideInLeft'} 0.3s ease-out;
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const MessageBubble = styled.div`
  max-width: 100%;
  padding: 16px 20px;
  border-radius: 20px;
  background: ${props => props.sender === 'user' 
    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  };
  color: ${props => props.sender === 'user' ? 'white' : '#1e293b'};
  box-shadow: ${props => props.sender === 'user' 
    ? '0 8px 25px rgba(59, 130, 246, 0.3)' 
    : '0 4px 15px rgba(0, 0, 0, 0.08)'
  };
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.5;
  font-size: 0.95rem;
  border: ${props => props.sender === 'user' 
    ? 'none' 
    : '1px solid rgba(59, 130, 246, 0.1)'
  };
  position: relative;
  transition: all 0.2s ease;
  
  ${props => props.sender === 'user' 
    ? 'border-bottom-right-radius: 6px;' 
    : 'border-bottom-left-radius: 6px;'
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.sender === 'user' 
      ? '0 12px 30px rgba(59, 130, 246, 0.4)' 
      : '0 6px 20px rgba(0, 0, 0, 0.12)'
    };
  }
  
  @media (max-width: 768px) {
    max-width: 85%;
    padding: 14px 18px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    max-width: 90%;
    padding: 12px 16px;
    font-size: 0.85rem;
  }
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: ${props => props.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : '#64748b'};
  margin-top: 6px;
  text-align: ${props => props.sender === 'user' ? 'right' : 'left'};
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.sender === 'user' 
    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
    : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${props => props.sender === 'user' ? '0 0 0 8px' : '0 8px 0 0'};
  font-size: 14px;
  color: ${props => props.sender === 'user' ? 'white' : '#64748b'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
`;

const Message = ({ message }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <MessageContainer sender={message.sender}>
      {message.sender === 'bot' && (
        <MessageAvatar sender={message.sender}>
          🤖
        </MessageAvatar>
      )}
      
      <MessageContent sender={message.sender}>
        <MessageBubble sender={message.sender}>
          {message.text}
        </MessageBubble>
        <MessageTime sender={message.sender}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </MessageContent>
      
      {message.sender === 'user' && (
        <MessageAvatar sender={message.sender}>
          👤
        </MessageAvatar>
      )}
    </MessageContainer>
  );
};

export default Message; 