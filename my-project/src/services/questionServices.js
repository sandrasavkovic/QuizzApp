const API_URL = process.env.REACT_APP_API_URL;

export async function createQuestion(question) {
  const token = localStorage.getItem("token");

  try {
    console.log(question);
    const response = await fetch(`${API_URL}/api/question/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(question)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create question");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function getQuestions() {
  try{
    const token = localStorage.getItem("token");

    const response = await fetch (`${API_URL}/api/question/questions`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    if(!response.ok)
    {
       const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch questions");
    }
    
    return await response.json();
  } catch (err) {
      throw err;
  }
}

export async function updateQuestion(id, newQuestion) {
   try {
        const token = localStorage.getItem("token");

    console.log(newQuestion);
    console.log(JSON.stringify( newQuestion));
    const response = await fetch(`${API_URL}/api/question/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    body: JSON.stringify(newQuestion)
    });

    console.log(response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status}:${errorText || "Failed to update question"}`);
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function deleteQuestion(id) {
  try {
        const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/question/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete question");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
