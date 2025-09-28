import React, { useState, useEffect } from "react";
import { getThemes } from "../../../../services/themeService";
import { getQuestions } from "../../../../services/questionServices";
import { updateQuizz } from "../../../../services/quizServices";
import "./AddQuizzForm.css";
import SelectQuestionsModal from "./SelectQuestionsModal";
import { toast } from "react-toastify";
export default function EditQuizForm({ quiz, onClose, onQuizUpdated }) {
  const [title, setTitle] = useState(quiz.title);
  const [description, setDescription] = useState(quiz.description);
  const [timeLimit, setTimeLimit] = useState(quiz.timeLimit);
  const [difficulty, setDifficulty] = useState(quiz.difficulty);
  const [themes, setThemes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showSelectQuestionsModal, setShowSelectQuestionsModal] = useState(false);
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedQuestions.length === 0) {
      toast.warning("You must select at least one question for the quiz!");
    return;
  }
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
            toast.success("Successfully updated quizz!");
            console.log("USPESNOO");
      }
     else{
        toast.error(data.message);
     }
    } catch(err) {
      console.error("Failed to update quiz:", err);
      toast.error("Failed to update quiz!");
    }
  };


  
const hadnleEditQuestionsClick = () => setShowSelectQuestionsModal(true);
const handleCloseSelectQuestions = () => setShowSelectQuestionsModal(false);

const toggleQuestion = (id) => {
  setSelectedQuestions((prev) =>
    prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
  );
};
    
  

  return (
    <div className="add-quiz-overlay">
      <form onSubmit={handleSubmit} className="add-quiz-form">
        <h3>Edit Quiz</h3>

        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Description:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />

      
        
        {showSelectQuestionsModal && (
    <SelectQuestionsModal
      questions={questions}
      selectedQuestions={selectedQuestions}
      onToggle={toggleQuestion}
      onClose={handleCloseSelectQuestions}
    />
  )}


        <label>Time Limit (seconds):</label>
        <input type="number" min="30" step="30" value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} />

        <label>Difficulty:</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button type="button" className="btn btn-blue" onClick={hadnleEditQuestionsClick}>Edit questions</button>

        <div className="form-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
