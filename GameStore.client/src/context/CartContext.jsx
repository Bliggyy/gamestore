import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchUserCartDetails } from "../api/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((game) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) {
        return;
      }
      return [...prev, { ...game }];
    });
  }, []);

  const fetchCartItems = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    const cartDetails = await fetchUserCartDetails(user.username);
    setCartItems(cartDetails);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        fetchCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
