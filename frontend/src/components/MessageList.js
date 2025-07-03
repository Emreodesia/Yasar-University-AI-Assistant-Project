import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const MessageListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageList = ({ messages }) => {
  return (
    <MessageListContainer>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </MessageListContainer>
  );
};

export default MessageList; 