import { useEffect, useState } from 'react';
import { chatAPI } from '../../services/api';
import './Debug.css';

function MetricsView({ data }) {
  const [globalMetrics, setGlobalMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await chatAPI.getMetrics();
      setGlobalMetrics(response.data);
    } catch (error) {
      console.error('Load metrics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="debug-empty">Loading metrics...</div>;
  }

  return (
    <div className="metrics-view">
      {data && (
        <div className="debug-section-block">
          <h3>📊 Current Session</h3>
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-value">{data.messagesInSession}</div>
              <div className="metric-label">Total Messages</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.messagesInStage}</div>
              <div className="metric-label">Messages in Stage</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.stage}</div>
              <div className="metric-label">Current Stage</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{data.confidence}%</div>
              <div className="metric-label">Confidence</div>
            </div>
          </div>
        </div>
      )}

      {globalMetrics && (
        <>
          <div className="debug-section-block">
            <h3>🌍 Global Statistics</h3>
            <div className="metric-card large">
              <div className="metric-value">{globalMetrics.totalSessions}</div>
              <div className="metric-label">Total Sessions Processed</div>
            </div>
          </div>

          {globalMetrics.stageMetrics && Object.keys(globalMetrics.stageMetrics).length > 0 && (
            <div className="debug-section-block">
              <h3>📈 Stage Performance</h3>
              {Object.entries(globalMetrics.stageMetrics).map(([stage, stats]) => (
                <div key={stage} className="stage-metric-card">
                  <h4>{stage}</h4>
                  <div className="stage-stats">
                    <div className="stat-item">
                      <span className="stat-label">Count:</span>
                      <span className="stat-value">{stats.count}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Avg Confidence:</span>
                      <span className="stat-value">{stats.avgConfidence.toFixed(1)}%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Avg Messages:</span>
                      <span className="stat-value">{stats.avgMessages.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {globalMetrics.emotionalTrends && Object.keys(globalMetrics.emotionalTrends).length > 0 && (
            <div className="debug-section-block">
              <h3>😊 Emotional Trends</h3>
              <div className="trend-list">
                {Object.entries(globalMetrics.emotionalTrends).map(([trend, count]) => (
                  <div key={trend} className="trend-item">
                    <span className="trend-name">{trend}</span>
                    <span className="trend-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MetricsView;