import React, { useState, useEffect } from "react";
import { authService, dbService } from "../fbInstance";

const Profile = ({ userObj }) => {
  const [twittts, setTwittts] = useState([]);

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

  useEffect(() => {
    getMyTwittts();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogOut}>Log out</button>
      {twittts.map((twittt) => (
        <h4>{twittt.text}</h4>
      ))}
    </div>
  );
};

export default Profile;
