import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Top() {
  const [loggedIn] = useState(localStorage.getItem("islogedin") === "true");
  const avatar = localStorage.getItem("avatar");

  return (
    <div className="tops">
      <div className="title">
        <span className="icon">🔍</span>
        <input type="search" placeholder="Search quizzes or topics..." />
      </div>

      <div className="side">
        {loggedIn ? (
          <Link to="/profile">
            <div className="profile-top">
              <img src={avatar || logo} alt="Profile" />
            </div>
          </Link>
        ) : (
          <div className="top-btns">
            <Link to="/signup"><button>Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Top;