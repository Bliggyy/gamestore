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
} from "./pages/Index";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationDisplay from "./components/NotificationDisplay";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Navbar />

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
            </Route>
            <Route path="/genres" element={<Genres />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <NotificationDisplay />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
