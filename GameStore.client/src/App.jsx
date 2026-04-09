import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Games,
  GameDetails,
  GameCreate,
  GameEdit,
  Genres,
  Home,
  Login,
  GenreCreate,
  GenreEdit,
  Create,
  Checkout,
  OwnedGames,
} from "./pages/Index";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./context/ProtectedRoute";
import NotificationDisplay from "./components/NotificationDisplay";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Navbar />
          <CartSidebar />

          {/* centered content area */}
          <div className="content p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/games/create" element={<GameCreate />} />
                <Route path="/games/edit/:id" element={<GameEdit />} />
                <Route path="/genres/create" element={<GenreCreate />} />
                <Route path="/genres/edit/:id" element={<GenreEdit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-games" element={<OwnedGames />} />
              </Route>
              <Route path="/genres" element={<Genres />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </CartProvider>
        <NotificationDisplay />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
