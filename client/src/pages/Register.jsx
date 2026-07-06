import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Base URL:", API.defaults.baseURL);
console.log("Sending:", {
  name,
  email,
  password,
});
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message);

      // Redirect to login page after successful registration
      navigate("/");
    } catch (error) {
  console.log("Full error:", error);
  console.log("Response:", error.response);
  console.log("Request:", error.request);
  console.log("Message:", error.message);

  toast.error(error.response?.data?.message || error.message);
}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>TaskFlow</h1>
        <p>Create your account</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        <p style={{ marginTop: "15px" }}>
  Already have an account?{" "}
  <Link
    to="/"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Login
  </Link>
</p>
      </form>
    </div>
  );
}

export default Register;