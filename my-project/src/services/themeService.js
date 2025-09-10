const API_URL = process.env.REACT_APP_API_URL;

export async function createTheme(new_theme) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/theme/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({Name:new_theme})
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create theme");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function getThemes() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/theme/themes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create theme");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}