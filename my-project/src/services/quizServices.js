const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

export async function getQuizzes() {
  try {

    const response = await fetch(`${API_URL}/api/quizz/basic`, {
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

export async function createQuiz(newQuiz) {
  try {
    const response = await fetch(`${API_URL}/api/quizz/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newQuiz)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create quizz");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function getQuizById(quizId) {
  try {

    const response = await fetch(`${API_URL}/api/quizz/getById/${quizId}`, {
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
    console.log("Kviz", data);
    return data;
  } catch (err) {
    throw err;
  }
}


export async function updateQuizz(id, newQuizz) {
   try {
    console.log(newQuizz);
    console.log(JSON.stringify( newQuizz));
    const response = await fetch(`${API_URL}/api/quizz/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    body: JSON.stringify(newQuizz)
    });

    console.log(response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status}:${errorText || "Failed to update quizz"}`);
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function deleteQuizz(id) {
  try {
    const response = await fetch(`${API_URL}/api/quizz/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete quizz");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
