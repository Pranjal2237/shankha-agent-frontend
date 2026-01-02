import './Debug.css';

function PlannerView({ data }) {
  if (!data) return <div className="debug-empty">No planner data</div>;

  const getSafetyColor = (level) => {
    switch(level) {
      case 'safe': return '#10b981';
      case 'caution': return '#f59e0b';
      case 'crisis': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="planner-view">
      <div className="debug-section-block">
        <h3>🎯 Current Objective</h3>
        <p className="objective-text">{data.objective}</p>
      </div>

      <div className="debug-section-block">
        <h3>😊 Emotional State</h3>
        <div className="emotion-grid">
          <div className="emotion-item">
            <span className="emotion-label">Emotion</span>
            <span className="emotion-value">{data.emotion || 'neutral'}</span>
          </div>
          <div className="emotion-item">
            <span className="emotion-label">Intensity</span>
            <span className="emotion-value">{data.intensity || 'medium'}</span>
          </div>
        </div>
      </div>

      <div className="debug-section-block">
        <h3>🛡️ Safety Level</h3>
        <div 
          className="safety-badge"
          style={{ backgroundColor: getSafetyColor(data.safety_level) }}
        >
          {data.safety_level?.toUpperCase() || 'SAFE'}
        </div>
      </div>

      <div className="debug-section-block">
        <h3>📋 Instructions</h3>
        {data.instructions && (
          <>
            <div className="instruction-item">
              <strong>Approach:</strong>
              <p>{data.instructions.approach}</p>
            </div>
            
            {data.instructions.key_points && data.instructions.key_points.length > 0 && (
              <div className="instruction-item">
                <strong>Key Points:</strong>
                <ul>
                  {data.instructions.key_points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.instructions.question && (
              <div className="instruction-item">
                <strong>Question:</strong>
                <p className="question-text">{data.instructions.question}</p>
              </div>
            )}

            <div className="instruction-item">
              <strong>Tone:</strong>
              <p>{data.instructions.tone}</p>
            </div>

            {data.instructions.avoid && data.instructions.avoid.length > 0 && (
              <div className="instruction-item avoid">
                <strong>❌ Avoid:</strong>
                <ul>
                  {data.instructions.avoid.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="debug-section-block">
        <h3>🔮 Next Stage Prediction</h3>
        {data.next && (
          <>
            <p><strong>Stage:</strong> {data.next.stage}</p>
            <p><strong>Condition:</strong> {data.next.condition}</p>
          </>
        )}
      </div>

      <div className="debug-section-block">
        <h3>📊 Confidence</h3>
        <div className="confidence-bar">
          <div 
            className="confidence-fill"
            style={{ width: `${data.confidence || 0}%` }}
          >
            {data.confidence || 0}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlannerView;