import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthLayout } from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Protected route: Only accessible when logged in */}
          <Route element={<AuthLayout requiresAuth={true} />}>
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>

          {/* Public routes: Only accessible when logged out */}
          <Route element={<AuthLayout requiresAuth={false} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
