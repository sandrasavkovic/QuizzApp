import { useState } from "react";
import "./AddQuestionForm.css";
import { createQuestion } from "../../../services/questionServices";

function AddQuestionForm({ themes, onClose, onQuestionCreated }) {
  const [selectedThemeId, setSelectedThemeId] = useState(themes[0]?.Id || "");
  const [text, setText] = useState("");
  const [type, setType] = useState("SingleChoice");
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [themeName, setThemeName] = useState("");

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      Text: text,
      ThemeId: selectedThemeId,
      Type: type,
      Options: type === "SingleChoice" || type === "MultipleChoice" ? options : [],
      CorrectAnswer: type === "FillInTheBlank" || type === "TrueFalse" ? correctAnswer : null,
    };
    // poziv API-ja za backend može ići ovde
    const data = await createQuestion(newQuestion);
    onQuestionCreated(newQuestion);
  };

  const handleAddTheme = (newTheme) =>
  {


  }

  return (
    <div className="add-question-overlay">
      <div className="add-question-form">
        <h2>Add New Question</h2>
        <form onSubmit={handleSubmit}>
          <label>Theme:</label>
          <select value={selectedThemeId} onChange={(e) => setSelectedThemeId(Number(e.target.value))}>
            {themes.map(theme => (
              <option key={theme.Id} value={theme.Id}>{theme.Name}</option>
            ))}
          </select>
         <label>Add new theme:</label>
         <input type="text" value={themeName} placeholder="enter theme name" onChange={e=>setThemeName(e.target.value)}/>
         <button onClick={handleAddTheme(themeName)}>Add theme</button>
          <label>Question Text:</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} required />

          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option>SingleChoice</option>
            <option>MultipleChoice</option>
            <option>TrueFalse</option>
            <option>FillInTheBlank</option>
          </select>

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
                    <input 
                      type="checkbox" 
                      checked={option.isCorrect} 
                      onChange={e => handleOptionChange(idx, "isCorrect", e.target.checked)} 
                    />
                  </label>
                </div>
              ))}
              <button type="button" onClick={handleAddOption}>Add Option</button>
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
            <button type="submit" className="btn btn-blue">Save Question</button>
            <button type="button" className="btn btn-gray" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionForm;
