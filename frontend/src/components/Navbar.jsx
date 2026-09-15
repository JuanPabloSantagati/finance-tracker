import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <span className="text-lg font-semibold text-slate-900">💰 Finance Tracker</span>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Hola, {user.name}</span>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  );
}