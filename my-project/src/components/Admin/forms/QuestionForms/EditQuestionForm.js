import { useState, useEffect } from "react";
import "./AddQuestionForm.css"; // isti CSS kao za AddQuestionForm
import { updateQuestion } from "../../../../services/questionServices";
import { toast } from "react-toastify";

function EditQuestionForm({ question, themes, onClose, onQuestionUpdated }) {
  const [selectedThemeId, setSelectedThemeId] = useState(question.themeId || "");
  const [text, setText] = useState(question.text || "");
  const [type, setType] = useState(question.type || "SingleChoice");
  const [points, setPoints] = useState(question.points || 0);
  const [options, setOptions] = useState(question.options || [{ text: "", isCorrect: false }]);
  const [correctAnswer, setCorrectAnswer] = useState(question.correctAnswer || "");
  const [error, setError] = useState(null);
  useEffect(() => {
    if (type === "TrueFalse" && !correctAnswer) {
      setCorrectAnswer("True");
    }
  }, [type]);

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSingleChoice = (selectedIdx) => {
    const newOptions = options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === selectedIdx
    }));
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedQuestion = {
      id: question.id,
      Text: text,
      ThemeId: Number(selectedThemeId),
      Type: type,
      Points: Number(points),
      Options: (type === "SingleChoice" || type === "MultipleChoice") ? options : [],
      CorrectAnswer: (type === "FillInTheBlank" || type === "TrueFalse") ? correctAnswer : null,
    };

    try {
      const data = await updateQuestion(question.id, updatedQuestion);
      if(data.success){
      onQuestionUpdated(data.question);
      onClose();
      toast.success("Question updated successfully!")
      }else{
         toast.error(data.message);
      }
     } catch (err) {
      console.error("Update error:", err.message);
      
        toast.error("Failed to update question. Please try again.");
  
     }
      
  };

  return (
    <div className="add-question-overlay">
      <div className="add-question-form">
        <h2>Edit Question</h2>
      {error && <div className="error-message">{error}</div>}

        <label>Theme:</label>
        <select value={selectedThemeId} onChange={(e) => setSelectedThemeId(Number(e.target.value))}>
          {themes.map(theme => (
            <option key={theme.id} value={theme.id}>{theme.name}</option>
          ))}
        </select>

        <label>Question Text:</label>
        <input type="text" value={text} onChange={e => setText(e.target.value)} required />

        <label>Type:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>SingleChoice</option>
          <option>MultipleChoice</option>
          <option>TrueFalse</option>
          <option>FillInTheBlank</option>
        </select>

        <label>Points for question:</label>
        <input type="number" value={points} onChange={e => setPoints(e.target.value)} required />

        {(type === "SingleChoice" || type === "MultipleChoice") && (
          <div>
            <h4>Options:</h4>
            {options.map((option, idx) => (
              <div key={idx} className="option-row">
                <input
                  type="text"
                  value={option.text}
                  onChange={e => handleOptionChange(idx, "text", e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                />
                <label>
                  Correct:
                  {type === "SingleChoice" ? (
                    <input
                      type="radio"
                      name="singleCorrect"
                      checked={option.isCorrect}
                      onChange={() => handleSingleChoice(idx)}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={e => handleOptionChange(idx, "isCorrect", e.target.checked)}
                    />
                  )}
                </label>
              </div>
            ))}
            <button type="button" className="btn btn-blue" onClick={handleAddOption}>Add Option</button>
          </div>
        )}

        {(type === "FillInTheBlank" || type === "TrueFalse") && (
          <div>
            <label>Correct Answer:</label>
            {type === "TrueFalse" ? (
              <select value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)}>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            ) : (
              <input type="text" value={correctAnswer} onChange={e => setCorrectAnswer(e.target.value)} required />
            )}
          </div>
        )}

        <div className="form-buttons">
          <button onClick={handleSubmit} className="btn btn-blue">Save Question</button>
          <button type="button" className="btn btn-gray" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditQuestionForm;
