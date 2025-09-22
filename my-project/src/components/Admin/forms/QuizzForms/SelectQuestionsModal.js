import React from "react";
import "./SelectQuestionsModal.css";

export default function SelectQuestionsModal({ questions, selectedQuestions, onToggle, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Select Questions</h3>
        <div className="questions-list">
          {questions.map((q) => (
            <label key={q.id} className="question-option">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(q.id)}
                onChange={() => onToggle(q.id)}
              />
              {q.text}
            </label>
          ))}
        </div>

        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-blue">Done</button>
        </div>
      </div>
    </div>
  );
}
