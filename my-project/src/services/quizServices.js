const API_URL = process.env.REACT_APP_API_URL;

export async function getQuizzes() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/quiz/quizzes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch quizzes");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}