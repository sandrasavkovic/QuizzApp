const API_URL = process.env.REACT_APP_API_URL;

export async function createTheme(new_theme) {

  try {
        const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/theme/create`, {
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

  try {
        const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/theme/themes`, {
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

export async function updateTheme(id, newTheme) {
   try {
        const token = localStorage.getItem("token");

    console.log(JSON.stringify({ id: id, name: newTheme.name }));
    const response = await fetch(`${API_URL}/api/theme/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
body: JSON.stringify({ id: id, name: newTheme.name })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update theme");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

export async function deleteTheme(id) {
  try {
        const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/theme/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete theme");
    }
    const data = await response.json();
    return data; // { success: true/false }
    
  } catch (err) {
    throw err;
  }
}
