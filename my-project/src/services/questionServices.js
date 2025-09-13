export async function createQuestion(question) {
  const token = localStorage.getItem("token");

  try {
    console.log(question);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/create`, {
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
