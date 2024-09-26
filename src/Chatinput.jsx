import React, { useState } from 'react';

const ChatInput = ({ onSend, onEscalate }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="chat-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit"><i class="fas fa-paper-plane"></i>
        </button>
      </form>
      <button className="escalate-button" onClick={onEscalate}>Live Agent<i class="fas fa-user"></i></button>
    </div>
  );
};

export default ChatInput;
