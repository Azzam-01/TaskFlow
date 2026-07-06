import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../navbar.css";
import {
  FaUserCircle,FaMoon,FaSignOutAlt,FaClipboardList,FaBell,FaUser} from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  return (
  <nav className="navbar">

    {/* LEFT */}
<div className="navbar-left">

  <h2 className="logo">
    <FaClipboardList />
    <span>TaskFlow</span>
  </h2>

  <div className="nav-links">
    <button onClick={() => navigate("/dashboard")}>
      Dashboard
    </button>

    <button>
      Tasks
    </button>

    <button>
      Calendar
    </button>
  </div>

</div>

    {/* RIGHT */}
<div className="navbar-right">

  {/* Notification */}
  <button className="icon-btn">
    <FaBell />
  </button>

  {/* Dark Mode */}
  <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️" : <FaMoon />}
</button>

  {/* User */}
  <div
    className="user-menu"
    onClick={() => setShowMenu(!showMenu)}
  >
    <FaUserCircle className="user-icon" />
    <span>{user.name || "User"}</span>
    ▼
  </div>

  {showMenu && (
    <div className="user-dropdown">

      <div className="dropdown-header">
        <FaUserCircle size={55} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>

      <hr />

      <div
        className="dropdown-item"
        onClick={() => navigate("/profile")}
      >
        <FaUser /> My Profile
      </div>

      <div
        className="dropdown-item logout-item"
        onClick={logout}
      >
        <FaSignOutAlt /> Logout
      </div>

    </div>
  )}

</div>
  </nav>
);
}

export default Navbar;