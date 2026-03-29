const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchGenres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    throw error;
  }
};

export const createGenre = async (genre) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/genres`, {
      method: "POST",
      body: JSON.stringify({ name: genre }),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status} with message: ${errorText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create genre: ", error);
    throw error;
  }
};

export const editGenre = async (id, genre) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: genre }),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status} with message: ${errorText}`,
      );
    }

    return await response;
  } catch (error) {
    console.error("Failed to create genre: ", error);
    throw error;
  }
};
