const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");


export async function saveQuizResult(resultDto) {
   try {
    const response = await fetch(`${API_URL}/api/userQuizz/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(resultDto)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to save results for quizz");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}


export async function getUserResults(userId) {
  try {

    const response = await fetch(`${API_URL}/api/userQuizz/results/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch results");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}
