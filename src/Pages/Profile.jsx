import { useState, useRef } from "react";
import Top from "./top";
import NavBar from "./NavBar";

function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "Anonymous");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const [saveMsg, setSaveMsg] = useState("");
  const fileRef = useRef(null);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      setAvatar(dataUrl);
      localStorage.setItem("avatar", dataUrl);
      showSaved();
    };
    reader.readAsDataURL(file);
  }

  function saveName() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setUsername(trimmed);
    localStorage.setItem("username", trimmed);
    setEditingName(false);
    showSaved();
  }

  function showSaved() {
    setSaveMsg("Saved ✓");
    setTimeout(() => setSaveMsg(""), 2000);
  }

  function removeAvatar() {
    setAvatar(null);
    localStorage.removeItem("avatar");
    showSaved();
  }

  return (
    <div className="layout">
      
      <div className="content">
        <Top />
        <div className="profile-page">
          <h2 className="profile-title">My Profile</h2>

          {/* Avatar section */}
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-wrap" onClick={() => fileRef.current.click()}>
                {avatar ? (
                  <img src={avatar} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="avatar-overlay">
                  <span>Change</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              {avatar && (
                <button className="remove-avatar-btn" onClick={removeAvatar}>
                  Remove photo
                </button>
              )}
              <p className="avatar-hint">Click avatar to upload · Max 2MB</p>
            </div>

            {/* Username section */}
            <div className="profile-field">
              <label className="field-label">Username</label>
              {editingName ? (
                <div className="field-edit-row">
                  <input
                    className="field-input"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveName()}
                    autoFocus
                    maxLength={32}
                    placeholder="Enter username..."
                  />
                  <button className="field-save-btn" onClick={saveName}>Save</button>
                  <button
                    className="field-cancel-btn"
                    onClick={() => { setEditingName(false); setNameInput(username); }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="field-display-row">
                  <span className="field-value">{username}</span>
                  <button className="field-edit-btn" onClick={() => setEditingName(true)}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {saveMsg && <div className="save-toast">{saveMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;