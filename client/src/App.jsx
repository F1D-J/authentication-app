import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate replace to="/dashboard" /> : <Navigate replace to="/login" />}
      />

      <Route
        path="/login"
        element={token ? <Navigate replace to="/dashboard" /> : <Login />}
      />

      <Route
        path="/register"
        element={token ? <Navigate replace to="/dashboard" /> : <Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate replace to={token ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;