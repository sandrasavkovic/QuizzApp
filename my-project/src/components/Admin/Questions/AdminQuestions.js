import { useState, useEffect } from "react";
import { getQuestions, deleteQuestion } from "../../../services/questionServices";
import { getThemes } from "../../../services/themeService";
import AddQuestionForm from "../forms/QuestionForms/AddQuestionForm";
import EditQuestionForm from "../forms/QuestionForms/EditQuestionForm";
import "./AdminQuestions.css";

function AdminQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getQuestions();
      console.log(data);
      setQuestions(data);
    }

    async function  fetchThemes() {
      const themesData = await getThemes();
      console.log(themesData);
      setThemes(themesData);
    }
    fetchData();
    fetchThemes();
  }, []);

  


  const handleQuestionAdded = (question) => setQuestions(prev => [...prev, question]);

  const handleQuestionUpdated = (updatedQuestion) =>
    setQuestions(prev => prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

     try {
       await deleteQuestion(id);
       setQuestions(prev => prev.filter(q => q.id !== id));
       alert("Question deleted successfully!");
     } catch (err) {
       console.error("Error deleting question:", err);
       alert("Failed to delete question");
     }
  };

  return (
    <div className="admin-questions-page">
      <h1>Questions</h1>
      <button onClick={() => setShowForm(true)}>Add Question</button>
      {showForm && 
        <AddQuestionForm 
          themes={themes}
          onQuestionCreated={handleQuestionAdded} 
          onClose={() => setShowForm(false)} 
        />
      }

      {editingQuestion &&
        <EditQuestionForm
          question={editingQuestion}
          themes={themes}
          onQuestionUpdated={handleQuestionUpdated}
          onClose={() => setEditingQuestion(null)}
        />
      }

      <ul>
        {questions.map(q => (
          <li key={q.id}>
            <strong>{q.text}</strong> (Theme: {q.theme}, Points: {q.points})
            <button onClick={() => setEditingQuestion(q)}>Edit</button>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminQuestionsPage;
