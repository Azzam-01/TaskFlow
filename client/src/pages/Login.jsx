import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      
      // Save token
localStorage.setItem("token", res.data.token);

// Save user details
localStorage.setItem("user", JSON.stringify(res.data.user));

navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>TaskFlow</h1>
        <p>Login to continue</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <p style={{ marginTop: "15px" }}>
  Don't have an account?{" "}
  <Link
    to="/register"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Register
  </Link>
</p>
      </form>
    </div>
    
  );
}

export default Login;