import React from "react";
import { authService } from "../fbInstance";

const Profile = () => {
  const handleLogOut = () => {
    authService.signOut();
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default Profile;
