import { useState } from 'react';
import PlannerView from './PlannerView';
import StageTracker from './StageTracker';
import MemoryView from './MemoryView';
import MetricsView from './MetricsView';
import './Debug.css';

function DebugPanel({ data }) {
  const [activeTab, setActiveTab] = useState('planner');

  if (!data) {
    return (
      <div className="debug-panel">
        <div className="debug-empty">
          <h3>🔍 Debug Panel</h3>
          <p>Send a message to see agent debug data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="debug-panel">
      <div className="debug-tabs">
        <button
          className={`debug-tab ${activeTab === 'planner' ? 'active' : ''}`}
          onClick={() => setActiveTab('planner')}
        >
          Planner
        </button>
        <button
          className={`debug-tab ${activeTab === 'stage' ? 'active' : ''}`}
          onClick={() => setActiveTab('stage')}
        >
          Stage
        </button>
        <button
          className={`debug-tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Memory
        </button>
        <button
          className={`debug-tab ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          Metrics
        </button>
      </div>

      <div className="debug-content">
        {activeTab === 'planner' && <PlannerView data={data.plan} />}
        {activeTab === 'stage' && <StageTracker plan={data.plan} metrics={data.metrics} />}
        {activeTab === 'summary' && <MemoryView data={data.summary} />}
        {activeTab === 'metrics' && <MetricsView data={data.metrics} />}
      </div>
    </div>
  );
}

export default DebugPanel;