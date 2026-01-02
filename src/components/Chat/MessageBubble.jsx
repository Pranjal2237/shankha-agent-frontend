import './Chat.css';

function MessageBubble({ message }) {
  const { role, text, timestamp } = message;

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message ${role}`}>
      <div className="message-avatar">
        {role === 'user' ? '👤' : '🕉️'}
      </div>
      <div className="message-content">
        <div className="message-text">{text}</div>
        <div className="message-time">{formatTime(timestamp)}</div>
      </div>
    </div>
  );
}

export default MessageBubble;