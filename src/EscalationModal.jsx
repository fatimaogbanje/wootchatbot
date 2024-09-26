import React from 'react';

const EscalationModal = ({ onClose }) => {
  return (
    <div className="escalation-modal">
      <h2>Escalation Request</h2>
      <p>Your request is being forwarded to a human representative.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EscalationModal;
