import './Debug.css';

function StageTracker({ plan, metrics }) {
  if (!plan) return <div className="debug-empty">No stage data</div>;

  const stageColors = {
    'Surface Understanding': '#3b82f6',
    'Emotional Exploration': '#8b5cf6',
    'Root Cause Exploration': '#ec4899',
    'Spiritual Perspective': '#f59e0b',
    'Practical Tools': '#10b981',
    'Reinforcement': '#06b6d4',
    'Closure': '#64748b',
    'Crisis Stabilization': '#ef4444',
    'Information Delivery': '#6366f1'
  };

  const stageColor = stageColors[plan.stage] || '#64748b';

  return (
    <div className="stage-tracker">
      <div className="debug-section-block">
        <h3>📍 Current Stage</h3>
        <div 
          className="stage-badge-large"
          style={{ backgroundColor: stageColor }}
        >
          {plan.stage}
        </div>
      </div>

      <div className="debug-section-block">
        <h3>⏱️ Stage Progress</h3>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${plan.stage_progress || 0}%`,
                backgroundColor: stageColor
              }}
            />
          </div>
          <span className="progress-text">{plan.stage_progress || 0}%</span>
        </div>
      </div>

      {metrics && (
        <div className="debug-section-block">
          <h3>📊 Session Metrics</h3>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-value">{metrics.messagesInSession}</div>
              <div className="metric-label">Messages</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{metrics.messagesInStage}</div>
              <div className="metric-label">In Stage</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{metrics.confidence}%</div>
              <div className="metric-label">Confidence</div>
            </div>
          </div>
        </div>
      )}

      <div className="debug-section-block">
        <h3>🎯 Stage Details</h3>
        <div className="stage-detail">
          <strong>Messages in Stage:</strong> {plan.messages_in_stage || 0}
        </div>
        {plan.next && (
          <div className="stage-detail">
            <strong>Next Stage:</strong> {plan.next.stage}
          </div>
        )}
      </div>
    </div>
  );
}

export default StageTracker;