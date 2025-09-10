import React, { useState, useEffect } from "react";
import { getThemes } from "../../../services/themeService";
import { createQuiz } from "../../../services/quizServices";
import "./AddQuizzForm.css";
export default function AddQuizForm({ onQuizAdded, onClose }) {
  const [title, setTitle] = useState("");
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [timeLimit, setTimeLimit] = useState(60); // default 60 sekundi
  const [difficulty, setDifficulty] = useState("Easy");

  useEffect(() => {
    async function fetchThemes() {
      try {
        const data = await getThemes();
        setThemes(data);
      } catch (err) {
        console.error("Failed to fetch themes", err);
      }
    }
    fetchThemes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const quizData = {
        title,
        themeIds: selectedThemes, // samo ID-jevi tema
        timeLimit,
        difficulty
      };

      const newQuiz = await createQuiz(quizData);
      onQuizAdded(newQuiz);
      onClose(); // zatvori formu
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz");
    }
  };

  const handleThemeChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedThemes(value);
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

        <label>Select Themes:</label>
        <div className="themes-list">
        {themes.map((t) => (
            <label key={t.id} className="theme-option">
        <input
             type="checkbox"
             value={t.id}
             checked={selectedThemes.includes(String(t.id))}
            onChange={(e) => {
          if (e.target.checked) {
            setSelectedThemes([...selectedThemes, String(t.id)]);
          } else {
            setSelectedThemes(selectedThemes.filter(id => id !== String(t.id)));
            }
                }}
             />
            {t.name}
            </label>
        ))}
        </div>


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

        <div className="form-buttons">
          <button type="submit">Add Quiz</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
