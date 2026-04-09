const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchGames = async (genre) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games${genre ? `?genre=${genre}` : ""}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch games:", error);
    throw error;
  }
};

export const fetchGameById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch game ${id}:`, error);
    throw error;
  }
};

export const createGame = async (gameData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "POST",
      body: gameData,
      headers: {
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
    console.error("Failed to create game: ", error);
    throw error;
  }
};

export const updateGame = async (id, gameData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "PUT",
      body: gameData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status} with message: ${errorText}`,
      );
    }

    return response;
  } catch (error) {
    console.error(`Failed to update game ${id}:`, error);
    throw error;
  }
};

export const deleteGame = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status} with message: ${errorText}`,
      );
    }

    return response;
  } catch (error) {
    console.error(`Failed to delete game ${id}:`, error);
    throw error;
  }
};

export const fetchOwnedGames = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_BASE_URL}/games/owned-games?user=${username}`,
      {
        method: "GET",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} Error: ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch owned games for user ${username}:`, error);
    throw error;
  }
};

export const addOwnedGame = async (gameData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/games/owned-games`, {
    body: gameData,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    gameData = JSON.parse(gameData);
    console.error(
      `Failed to add game by ${gameData.username} ${gameData.gameId}:`,
      response.statusText,
    );
  }

  return response;
};

export const deleteOwnedGame = async (id, username) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_BASE_URL}/games/owned-games/${id}?user=${username}`,
      {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} with message: ${response.statusText}`,
      );
    }

    return response;
  } catch (error) {
    console.error(`Failed to delete game owned by ${username} ${id}:`, error);
    throw error;
  }
};
