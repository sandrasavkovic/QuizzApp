import React, { useState, useEffect } from "react";
import { getThemes } from "../../../../services/themeService";
import { createQuiz } from "../../../../services/quizServices";
import { getQuestions } from "../../../../services/questionServices";
import "./AddQuizzForm.css";
import AddQuestionForm from ".././QuestionForms/AddQuestionForm";
import SelectQuestionsModal from "./SelectQuestionsModal";
import { toast } from "react-toastify";

export default function AddQuizForm({ onQuizAdded, onClose }) {
  const [title, setTitle] = useState("");
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [timeLimit, setTimeLimit] = useState(60); // default 60 sekundi
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
const [showSelectQuestionsModal, setShowSelectQuestionsModal] = useState(false);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const data = await getThemes();
        setThemes(data);
      } catch (err) {
        console.error("Failed to fetch themes", err);
      }

      try{
       const questionsData = await getQuestions();
        setQuestions(questionsData);
        console.log(questions);
      }
      catch(err)
      {
        console.error("Failed to fetch questions", err);
      }
    }
    fetchThemes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedQuestions.length === 0) {
    toast.warning("You must select at least one question for the quiz!");
    return;
  }
    /*
    // uzimam ideve tema iz questions (bez dupl)
    const themeIdsFromQuestions = [
  ...new Set(questions.map(q => Number(q.themeId))) 
    ];
    */
     // themeIds na osnovu odabranih pitanja

    const themeIdsFromQuestions = [
      ...new Set(
        selectedQuestions.map((qId) => {
          const q = questions.find((qq) => qq.id === qId);
          return q?.themeId;
        })
      ),
    ].filter(Boolean);

    const formattedQuestions = questions.map(q => ({
  ...q,
  ThemeId: Number(q.themeId), // backend očekuje ThemeId
  Theme: { Id: Number(q.themeId) } // backend očekuje i Theme objekat
}));

    try {
      console.log("OVO su teme: ", themeIdsFromQuestions);
      console.log("OVO SU PITANJA", questions);
      console.log("Selektovani idevi : ", selectedQuestions);
      const quizData = {
        title,
        description,
        // themeIds: selectedThemes, // samo ID-jevi tema
        themeIds:themeIdsFromQuestions,
        timeLimit,
        difficulty,
          //questions: questions
        questionIds:selectedQuestions

      };

      const newQuiz = await createQuiz(quizData);
      onQuizAdded(newQuiz);
      onClose(); // zatvori formu
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz");
    }
  };

const handleAddQuestionClick = () => setShowSelectQuestionsModal(true);
const handleCloseSelectQuestions = () => setShowSelectQuestionsModal(false);

const toggleQuestion = (id) => {
  setSelectedQuestions((prev) =>
    prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
  );
};
    
  

  return (
    <div className="add-quiz-overlay">
      <form onSubmit={handleSubmit} className="add-quiz-form">
        <h3>Add New Quiz</h3>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

     <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      


      
        
        {showSelectQuestionsModal && (
    <SelectQuestionsModal
      questions={questions}
      selectedQuestions={selectedQuestions}
      onToggle={toggleQuestion}
      onClose={handleCloseSelectQuestions}
    />
  )}


        <label>Time Limit (seconds):</label>
        <input
          type="number"
          min="30"
          step="30"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          required
        />

        <label>Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button type="button" className="btn btn-blue" onClick={handleAddQuestionClick}>Add Questions</button>

        <div className="form-buttons">
          <button type="submit">Add Quiz</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>

        
      </form>
    </div>
  );
}
