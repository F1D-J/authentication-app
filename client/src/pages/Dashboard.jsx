import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "User Management | Dashboard";
}, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
      setLoading(false);
    } 
   catch (err) {
  localStorage.removeItem("token");
  window.location.replace("/login");
}
  };

 const logout = () => {
  localStorage.removeItem("token");
  window.location.replace("/login");
};
  if (loading) {
  return <h2>Loading users...</h2>;
}

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        background: "#1e293b",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#38bdf8",
          marginBottom: "10px",
        }}
      >
        User Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "25px",
        }}
      >
        Registered Users
      </p>

      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Logout
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#0f172a",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb" }}>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              style={{
                borderBottom: "1px solid #334155",
              }}
            >
              <td style={{ padding: "12px", textAlign: "center" }}>
                {user.name}
              </td>

              <td style={{ padding: "12px", textAlign: "center" }}>
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Dashboard;