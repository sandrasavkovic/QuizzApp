import React, { useState, useEffect } from "react";
import { getThemes } from "../../../../services/themeService";
import { getQuestions } from "../../../../services/questionServices";
import { updateQuizz } from "../../../../services/quizServices";
import "./AddQuizzForm.css";
import { toast } from "react-toastify";
export default function EditQuizForm({ quiz, onClose, onQuizUpdated }) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [timeLimit, setTimeLimit] = useState(quiz.timeLimit);
  const [difficulty, setDifficulty] = useState(quiz.difficulty);
  const [themes, setThemes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const themesData = await getThemes();
        setThemes(themesData);

        const questionsData = await getQuestions();
        setQuestions(questionsData);

       
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
    useEffect(() => {
    if (quiz.questions) {
    setSelectedQuestions(quiz.questions.map(q => q.id));
    }
    }, [quiz.questions]);

  const toggleQuestion = (id) => {
    setSelectedQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const themeIdsFromQuestions = [
      ...new Set(
        selectedQuestions.map((qId) => {
          const q = questions.find(qq => qq.id === qId);
          return q?.themeId;
        })
      )
    ].filter(Boolean);

    const quizData = {
      title,
      description,
      themeIds: themeIdsFromQuestions,
      questionIds: selectedQuestions,
      timeLimit,
      difficulty
    };

    try {
      const data = await updateQuizz(quiz.id, quizData);
      if(data.success){
            onQuizUpdated(data.quizz);
      }
     else{
        toast.error(data.message);
     }
    } catch(err) {
      console.error("Failed to update quiz:", err);
      toast.error("Failed to update quiz!");
    }
  };

  return (
    <div className="add-quiz-overlay">
      <form onSubmit={handleSubmit} className="add-quiz-form">
        <h3>Edit Quiz</h3>

        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />

        <label>Select Questions:</label>
        <div className="questions-list">
          {questions.map(q => (
            <label key={q.id} className="question-option">
              <input type="checkbox"
                     checked={selectedQuestions.includes(q.id)}
                     onChange={() => toggleQuestion(q.id)}
              />
              {q.text}
            </label>
          ))}
        </div>

        <label>Time Limit (seconds):</label>
        <input type="number" min="30" step="30" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} />

        <label>Difficulty:</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <div className="form-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
