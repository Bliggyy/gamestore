const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchGames = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/games`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch games:', error);
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
    try {
        const response = await fetch(`${API_BASE_URL}/games`, {
            method: 'POST',
            body: gameData,
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to create game:', error);
        throw error;
    }
};