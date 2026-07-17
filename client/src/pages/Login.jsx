import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  useEffect(() => {
    document.title = "User Management | Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const login = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post("/login", {
        email,
        password,
      });

      authLogin(res.data.token);

navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      fontFamily: "Arial",
    }}
  >
    <div
      style={{
        background: "#1e293b",
        padding: "40px",
        borderRadius: "12px",
        width: "360px",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0,0,0,.4)",
      }}
    >
      <h1 style={{ color: "#38bdf8" }}>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <button
        onClick={login}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "20px", color: "white" }}>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);

}

export default Login;