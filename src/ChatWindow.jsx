import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className={`chat-message ${message.sender}`}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
