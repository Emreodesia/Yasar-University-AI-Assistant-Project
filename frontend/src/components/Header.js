import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 24px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  animation: slideInFromTop 1s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(30, 58, 138, 0.1) 100%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    padding: 16px 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  animation: fadeInScale 1.2s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  margin-right: 16px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
  animation: pulse 3s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  }
  
  @media (max-width: 768px) {
    height: 40px;
    margin-right: 12px;
  }
  
  @media (max-width: 480px) {
    height: 35px;
    margin-right: 10px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #ffffff 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.025em;
  line-height: 1.2;
  animation: shimmer 4s ease-in-out infinite;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    text-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 8px 0 0 0;
  font-weight: 400;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slideInFromBottom 1s ease-out 0.6s both;
  transition: all 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const BotIcon = styled.span`
  display: inline-block;
  margin-left: 12px;
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2) rotate(10deg);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-left: 8px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: pulse 4s ease-in-out infinite;
  z-index: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <GlowEffect />
      <LogoContainer>
        <Logo src="/logo.png" alt="Yaşar Üniversitesi Logo" />
        <Title>
          Yapay Zeka Asistanı
        </Title>
      </LogoContainer>
      <Subtitle>Yaşar Üniversitesi - Size yardımcı olmak için buradayız</Subtitle>
    </HeaderContainer>
  );
};

export default Header; 