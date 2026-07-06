import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setUser({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      console.error(error);
     toast.error("Failed to load profile");
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">

          <h1>👤 My Profile</h1>

          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              value={user.name}
              disabled
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              disabled
            />
          </div>

          <button
            className="save-profile-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
      <Footer />
    </>
  );
 

}

export default Profile;