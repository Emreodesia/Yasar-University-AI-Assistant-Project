import React from 'react';
import styled from 'styled-components';

const SuggestionContainer = styled.div`
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  
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
    padding: 16px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
  }
`;

const SuggestionTitle = styled.div`
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const SuggestionButton = styled.button`
  padding: 10px 18px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    border-color: #3b82f6;
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
`;

const SuggestionButtons = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <SuggestionContainer>
      <SuggestionTitle>Hızlı seçenekler:</SuggestionTitle>
      <ButtonsContainer>
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </SuggestionButton>
        ))}
      </ButtonsContainer>
    </SuggestionContainer>
  );
};

export default SuggestionButtons; 