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




export async function getQuizResultById(quizId) {
     try {

    const response = await fetch(`${API_URL}/api/userQuizz/result/${quizId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch result");
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

export async function getQuestionsForQuizz(quizzId) {
  try {

    const response = await fetch(`${API_URL}/api/userQuizz/questions/${quizzId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch questions");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}


export async function getQuizzById(quizzId) {
  try {

    const response = await fetch(`${API_URL}/api/userQuizz/quizz/${quizzId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch quizz");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}



export async function getLeaderboard(quizzId) {
  try{
    console.log("OVDE!", quizzId);
   const response = await fetch(`${API_URL}/api/userQuizz/leaderboard/${quizzId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  return await response.json();
  }
  catch (err) {
    throw err;
  }
}



export async function getGlobalboard() {
  try{
   const response = await fetch(`${API_URL}/api/userQuizz/globalboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch globalboard");
  }
  return await response.json();
  }
  catch (err) {
    throw err;
  }
}