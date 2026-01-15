import React from 'react';

// OrderStatusTimeline
// steps: [{key, label}]
// activeKey: string matching current step key
// timestamps: optional map { key: timestampString }
function OrderStatusTimeline({ steps = [], activeKey, timestamps = {} }) {
  const activeIndex = steps.findIndex(s => s.key === activeKey);

  return (
    <div className="order-timeline mb-4" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {steps.map((s, idx) => {
        const done = idx <= activeIndex;
        const isActive = idx === activeIndex;
        return (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: done ? '#ff7a1a' : 'transparent',
              border: done ? 'none' : '2px solid #ff7a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: done ? '#fff' : '#ff7a1a',
              fontSize: 12,
              boxShadow: isActive ? '0 0 0 6px rgba(255,122,26,0.08)' : 'none',
              transition: 'transform 200ms ease, background 200ms ease',
              transform: isActive ? 'scale(1.05)' : 'scale(1)',
            }}>
              {done ? (
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M1 6L5 10L15 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <div style={{ width: 8, height: 8, borderRadius: 4, background: 'transparent' }} />
              )}
            </div>

            <div style={{ minWidth: 120 }}>
              <div style={{ color: done ? '#ff7a1a' : '#666', fontSize: 13, fontWeight: isActive ? 600 : 500 }}>{s.label}</div>
              {timestamps && timestamps[s.key] && (
                <div style={{ fontSize: 11, color: '#888' }}>{timestamps[s.key]}</div>
              )}
            </div>

            {idx < steps.length - 1 && (
              <div style={{ height: 6, width: 36, background: idx < activeIndex ? '#ff7a1a' : '#ffe6d6', borderRadius: 4 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatusTimeline;
