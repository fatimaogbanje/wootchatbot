import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import EscalationModal from "./EscalationModal";
import { MarkdownBlock, MarkdownSpan, MarkdownElement } from "md-block";
import "./App.css";

const ChatbotApp = () => {
  const [messages, setMessages] = useState([]);
  const [escalationModalOpen, setEscalationModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to toggle chatbot visibility

  
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Function to handle sending messages to chatbot
  const handleSendMessage = async (text) => {
    const newMessage = { sender: "user", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=`, // Replace with your actual API key
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: text, // Assuming 'text' is the input message you want to send
                  },
                ],
              },
            ],
            systemInstruction: {
              role: "user",
              parts: [
                {
                  text: "You are Tima, a friendly virtual assistant who works for Wootlab Innovations. Wootlab Innovations is a non-profit organisation that leverages technology to promote inclusive and quality education for out-of-school children and youths in Africa...",
                },
              ],
            },
            generationConfig: {
              temperature: 1,
              topK: 64,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: "text/plain",
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      const botMessage =
        data.candidates[0].content?.parts[0]?.text ??
        "Sorry, something went wrong.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botMessage },
      ]);

      // Call the speakText function to read the bot's message
      speakText(botMessage); // Only bot messages are read aloud
    } catch (error) {
      console.error("Error querying chatbot:", error);
    }
  };

  // Handle Escalation
  const handleEscalation = () => {
    setEscalationModalOpen(true);
  };

  // Handle toggling the chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <i className={`fas fa-${isChatbotOpen ? "times" : "comments"}`}></i>
      </div>

      {isChatbotOpen && (
        <div className="chatbot-container">
          <h1 className="tima-sage">
            <span className="tima">Tima</span>
            <span className="sage">Wootie</span>
          </h1>

          <ChatWindow messages={messages} />
          <ChatInput onSend={handleSendMessage} onEscalate={handleEscalation} />
          {escalationModalOpen && (
            <EscalationModal onClose={() => setEscalationModalOpen(false)} />
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotApp;
