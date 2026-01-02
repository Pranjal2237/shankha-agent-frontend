import './Debug.css';

function MemoryView({ data }) {
  if (!data) return <div className="debug-empty">No memory data</div>;

  return (
    <div className="memory-view">
      <div className="debug-section-block">
        <h3>📝 Conversation Summary</h3>
        <p className="summary-text">
          {data.conversation_summary || 'No summary yet'}
        </p>
      </div>

      {data.topics && Object.keys(data.topics).length > 0 && (
        <div className="debug-section-block">
          <h3>🗂️ Topics</h3>
          {Object.entries(data.topics).map(([topic, info]) => (
            <div key={topic} className="topic-card">
              <div className="topic-header">
                <h4>{topic}</h4>
                <span className={`topic-status ${info.status}`}>
                  {info.status}
                </span>
              </div>
              <div className="topic-detail">
                <strong>Intent:</strong> {info.user_intent}
              </div>
              <div className="topic-detail">
                <strong>Approach:</strong> {info.ai_approach}
              </div>
              <div className="progress-bar small">
                <div 
                  className="progress-fill"
                  style={{ width: `${info.progress || 0}%` }}
                />
              </div>
              <span className="progress-label">{info.progress || 0}% progress</span>
            </div>
          ))}
        </div>
      )}

      {data.key_user_details && data.key_user_details.length > 0 && (
        <div className="debug-section-block">
          <h3>👤 User Details</h3>
          <ul className="detail-list">
            {data.key_user_details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {data.story_shloka_usage && data.story_shloka_usage.length > 0 && (
        <div className="debug-section-block">
          <h3>📚 Content Used</h3>
          <ul className="detail-list">
            {data.story_shloka_usage.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="debug-section-block">
        <h3>😊 Emotional State</h3>
        <div className="emotion-card">
          <div className="emotion-item">
            <span className="emotion-label">Dominant Emotion</span>
            <span className="emotion-value">
              {data.dominant_emotion || 'neutral'}
            </span>
          </div>
          <div className="emotion-item">
            <span className="emotion-label">Trend</span>
            <span className={`trend-badge ${data.emotional_trend}`}>
              {data.emotional_trend || 'stable'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryView;