import { useState, useEffect } from "react";
import "./AddQuestionForm.css";
import { createQuestion } from "../../../../services/questionServices";
import { createTheme } from "../../../../services/themeService";

function AddQuestionForm({ themes, onClose, onQuestionCreated }) {
  const [selectedThemeId, setSelectedThemeId] = useState(themes.length > 0 ? themes[0].id : "");
  const [text, setText] = useState("");
  const [type, setType] = useState("SingleChoice");
  const [points, setPoints] = useState(0);
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const [correctAnswer, setCorrectAnswer] = useState("");
 
useEffect(() => {
  if (type === "TrueFalse") {
    setCorrectAnswer("True"); 
  } else if (type === "FillInTheBlank") {
    setCorrectAnswer("");
  }
}, [type]);

    useEffect(() => {
    if (!selectedThemeId && themes && themes.length > 0) {
      setSelectedThemeId(themes[0].id);
    }
  }, [themes]);

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
    isCorrect: idx === selectedIdx  // samo selektovana opcija ostaje true
  }));
  setOptions(newOptions);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SELEKTOVANA TEMAAAA " , selectedThemeId);
    console.log("OPTIONS:" , options);
     const newQuestion = {
      Text: text,
      ThemeId: Number(selectedThemeId),
      Type: type, 
      Points:Number(points),
      Options: (type === "SingleChoice" || type === "MultipleChoice") ? options : [],
      CorrectAnswer: (type === "FillInTheBlank" || type === "TrueFalse") ? correctAnswer : null,
    };
    console.log(newQuestion);
    const data = await createQuestion(newQuestion);
    onQuestionCreated(data);
  };


  return (
    <div className="add-question-overlay">
      <div className="add-question-form">
        <h2>Add New Question</h2>
        
          <label>Theme:</label>
          <select value={selectedThemeId} onChange={(e) => setSelectedThemeId(Number(e.target.value))}>
            {themes.map(theme => (
              console.log("Tema" , theme),
              console.log("ID", theme.id),
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
          <input type="number" value={points} onChange={e => setPoints(e.target.value)} required/>
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
                    Correct:{type === "SingleChoice" ? (
                   <input
                   type="radio"
                    name="singleCorrect"  // sve opcije istog pitanja imaju isti name
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

export default AddQuestionForm;
