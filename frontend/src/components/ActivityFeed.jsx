import { useState } from 'react';
import { useProjectActivity, useAllActivity } from '../hooks/useActivityQuery.js';
import ActivityFeedItem from './ActivityFeedItem.jsx';

export default function ActivityFeed({ projectId }) {
  const [type, setType] = useState('');

  const projectQuery = useProjectActivity(projectId);
  const allQuery = useAllActivity(!projectId);
  const { data, isLoading, error } = projectId ? projectQuery : allQuery;

  const events = (data || []).filter((event) => !type || event.type === type);

  if (isLoading) {
    return <div className="activity-feed" style={{ textAlign: 'center', padding: '2rem' }}>Loading activity...</div>;
  }

  if (error) {
    return <div className="activity-feed" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Failed to load activity</div>;
  }

  return (
    <div className="activity-feed" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Filter by type:</h3>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        >
          <option value="">All Events</option>
          <option value="TASK_CREATED">Task Created</option>
          <option value="TASK_STATUS_CHANGED">Status Changed</option>
          <option value="TASK_APPROVED">Task Approved</option>
        </select>
      </div>

      <div className="activity-list" style={{ borderLeft: '3px solid #6366f1', paddingLeft: '2rem' }}>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>No activity found</div>
        ) : (
          events.map((event) => (
            <ActivityFeedItem key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}
