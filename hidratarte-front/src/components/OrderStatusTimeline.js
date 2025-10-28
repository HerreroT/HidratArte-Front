import React from 'react';
import './OrderStatusTimeline.css';

// OrderStatusTimeline
// steps: [{key, label}]
// activeKey: string matching current step key
// timestamps: optional map { key: timestampString }
function OrderStatusTimeline({ steps = [], activeKey, timestamps = {} }) {
  const activeIndex = steps.findIndex(s => s.key === activeKey);

  return (
    <div className="order-timeline mb-4">
      {steps.map((s, idx) => {
        const done = idx <= activeIndex;
        const isActive = idx === activeIndex;
        return (
          <div key={s.key} className="timeline-step">
            <div className="timeline-content">
              <div className={`timeline-circle ${done ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                {done ? (
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M1 6L5 10L15 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div className="timeline-dot" />
                )}
              </div>

              <div className="timeline-label">
                <div className={`timeline-title ${done ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                  {s.label}
                </div>
                {timestamps && timestamps[s.key] && (
                  <div className="timeline-timestamp">{timestamps[s.key]}</div>
                )}
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className={`timeline-connector ${idx < activeIndex ? 'done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatusTimeline;
