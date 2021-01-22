import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbInstance";

const Profile = ({ userObj }) => {
  const [twittts, setTwittts] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const handleLogOut = () => {
    authService.signOut();
  };

  const getMyTwittts = async () => {
    await dbService
      .collection("twittts")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setTwittts(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
    await console.log(twittts);
  };

  const handleDisplayNameChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const handleDisplayNameSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      const response = await authService.currentUser.updateProfile({
        displayName: newDisplayName,
      });
      await console.log(response);
    }
  };

  useEffect(() => {
    getMyTwittts();
  }, []);

  return (
    <div>
      <h1>Welcome {authService.currentUser.displayName}</h1>
      <form onSubmit={handleDisplayNameSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={handleDisplayNameChange}
        />
        <input type="submit" value="Update profile" />
      </form>
      <button onClick={handleLogOut}>Log out</button>
      {twittts.map((twittt) => (
        <h4>{twittt.text}</h4>
      ))}
    </div>
  );
};

export default Profile;
