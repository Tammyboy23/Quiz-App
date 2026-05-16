import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaQq } from "react-icons/fa";
import { LuCompass, LuPlus, LuX, LuMenu } from "react-icons/lu";

function NavBar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  function logout() {
    localStorage.setItem("islogedin", "false");
    localStorage.setItem("username", "");
    window.location.reload();
  }

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close drawer on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Prevent body scroll when drawer open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = (
    <div className="list">
      <Link to="/"><FaHome /> Dashboard</Link>
      <Link to="/explore"><LuCompass /> Explore</Link>
      <Link to="/create"><LuPlus /> Create Quiz</Link>
      <Link to="/profile"><FaUser /> Profile</Link>
    </div>
  );

  return (
    <>
      {/* Burger button — visible only on mobile */}
      <button className="burger-btn" onClick={() => setOpen(true)} aria-label="Open menu">
        <LuMenu />
      </button>

      {/* Overlay backdrop */}
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}

      {/* Slide-out drawer (mobile) */}
      <div className={`drawer ${open ? "drawer-open" : ""}`} ref={drawerRef}>
        <div className="drawer-header">
          <div className="logo">
            <h1><FaQq /> QUIZORA</h1>
          </div>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <LuX />
          </button>
        </div>
        {navLinks}
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      {/* Permanent sidebar (desktop) */}
      <div className="nav">
        <div className="logo">
          <h1><FaQq /> QUIZORA</h1>
        </div>
        {navLinks}
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default NavBar;