export const fetchUserCartDetails = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/carts?username=${username}`, {
      method: "GET",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cart details:", error);
    throw error;
  }
};

export const addToCart = async (cartData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      body: cartData,
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

export const deleteGame = async (cartData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "DELETE",
      body: cartData,
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
