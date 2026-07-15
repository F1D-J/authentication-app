import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

function Register() {

    useEffect(() => {
  document.title = "User Management | Register";
}, []);
const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
  alert("Please fill all fields");
  return;
}
    if (loading) return;

setLoading(true);
    try {
      const res = await API.post("/register", {
        name,
        email,
        password,
      });

navigate("/login");
    } catch (err) {
  alert(err.response?.data?.message || "Registration failed");
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
      <h1 style={{ color: "#38bdf8" }}>Register</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
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
        onClick={register}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={{ marginTop: "20px", color: "white" }}>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);
}

export default Register;