import { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../../services/api';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import './Chat.css';

function ChatWindow({ token, onDebugData }) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(text, sessionId);
      const { message, sessionId: newSessionId, debug } = response.data;

      // Set session ID if new
      if (!sessionId && newSessionId) {
        setSessionId(newSessionId);
      }

      // Add AI response
      const aiMessage = {
        role: 'assistant',
        text: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Send debug data to parent
      if (debug) {
        onDebugData(debug);
      }
    } catch (error) {
      console.error('Send message error:', error);
      const errorMessage = {
        role: 'assistant',
        text: 'I apologize, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    onDebugData(null);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">
          <h2>💬 Conversation with Krishna</h2>
          {sessionId && <span className="session-id">Session: {sessionId.slice(-6)}</span>}
        </div>
        <button className="new-chat-btn" onClick={handleNewChat}>
          + New Chat
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>🙏 Namaste</h3>
            <p>I am here to guide you like Krishna guided Arjun.</p>
            <p>Share what's on your mind, and let's explore together.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}

        {loading && (
          <div className="typing-indicator">
            <div className="message assistant">
              <div className="message-avatar">🕉️</div>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default ChatWindow;