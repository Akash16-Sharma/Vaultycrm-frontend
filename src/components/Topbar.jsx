import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Topbar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("projects")) return "Projects";
    if (path.includes("tasks")) return "Tasks";
    if (path.includes("clients")) return "Clients";
    if (path.includes("dashboard")) return "Dashboard";

    return "VaultyCRM";
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hi, Aakash</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
