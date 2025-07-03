import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    animation: float 20s ease-in-out infinite;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 1;
  animation: slideInFromBottom 1s ease-out;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 550px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 40px rgba(59, 130, 246, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInScale 0.8s ease-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
    border-radius: 24px;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 32px 64px -12px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      0 0 60px rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
    margin: 0;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    height: 100vh;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }
  
  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
    animation-delay: 4s;
  }
  
  &:nth-child(4) {
    top: 40%;
    right: 30%;
    animation-delay: 1s;
  }
  
  &:nth-child(5) {
    bottom: 20%;
    right: 10%;
    animation-delay: 3s;
  }
`;

function App() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Session ID oluştur
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
  }, []);

  return (
    <AppContainer>
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>
      <Header />
      <MainContent>
        <ChatContainer>
          <ChatInterface sessionId={sessionId} />
        </ChatContainer>
      </MainContent>
    </AppContainer>
  );
}

export default App; 