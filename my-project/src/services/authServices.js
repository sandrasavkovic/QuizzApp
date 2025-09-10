const API_URL = process.env.REACT_APP_API_URL;

export async function login(username, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username: username, Password: password }),
    });

    if (!response.ok) {
      // pokušavamo da dobijemo poruku sa backend-a
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}


export async function register(formData) {
  try {
    const data = new FormData();
    data.append("Username", formData.username);
    data.append("Email", formData.email);
    data.append("Password", formData.password);
    if (formData.image) data.append("ImageFile", formData.image);

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Registration failed");
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

