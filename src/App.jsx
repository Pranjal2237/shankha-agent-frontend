import { useState, useEffect } from 'react';
import ChatWindow from './components/Chat/ChatWindow';
import DebugPanel from './components/Debug/DebugPanel';
import Login from './components/auth/Login';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [debugData, setDebugData] = useState(null);
  const [showDebug, setShowDebug] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setDebugData(null);
  };

  if (!token) {
    return <Login onLogin={(token, userData) => {
      setToken(token);
      setUser(userData);
    }} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>🐚 Shankha AI</h1>
          <span className="header-subtitle">Agent Debug Dashboard</span>
        </div>
        <div className="header-right">
          <button 
            className="toggle-debug"
            onClick={() => setShowDebug(!showDebug)}
          >
            {showDebug ? '🔍 Hide Debug' : '🔍 Show Debug'}
          </button>
          {user && <span className="user-name">👤 {user.name}</span>}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="main-layout">
        <div className="chat-section">
          <ChatWindow 
            token={token} 
            onDebugData={setDebugData}
          />
        </div>

        {showDebug && (
          <div className="debug-section">
            <DebugPanel data={debugData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;