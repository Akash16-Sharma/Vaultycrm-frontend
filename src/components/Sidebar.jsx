import { NavLink } from "react-router-dom";
import { Home, Users, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-6 text-xl font-bold border-b">VaultlyCRM</div>
      <nav className="p-4 flex flex-col gap-4">
        <NavLink to="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink to="/clients" className="flex items-center gap-2 hover:text-blue-600">
          <Users size={20} /> Clients
        </NavLink>
        <NavLink to="/projects" className="flex items-center gap-2 hover:text-blue-600">
          <Users size={20} /> Projects
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-2 hover:text-blue-600">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
