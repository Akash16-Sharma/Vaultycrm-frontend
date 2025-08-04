import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client"
import DashBoardLayout from "./components/DashBoardLayout"
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardLayout>
            <   Dashboard />
              </DashBoardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
         element={
              <ProtectedRoute>
              <DashBoardLayout>
              <Client />
              </DashBoardLayout>
              </ProtectedRoute>
            }
        />
      </Routes>
    </Router>
  );
};

export default App;
