const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/genres`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        throw error;
    }
};