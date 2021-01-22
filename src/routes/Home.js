import React, { useState, useEffect } from "react";
import Twittt from "../components/Twittt";
import { dbService } from "../fbInstance";
import TwitttFactory from "../components/TwitttFactory";

const Home = ({ userObj }) => {
  const [twittts, setTwittts] = useState([]);

  useEffect(() => {
    dbService
      .collection("twittts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setTwittts(
          snapshot.docs.map((doc) => {
            const twitttObject = {
              key: doc.id,
              id: doc.id,
              ...doc.data(),
            };
            return twitttObject;
          })
        );
      });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <TwitttFactory userObj={userObj} />
      {twittts?.map((twittt) => (
        <Twittt
          key={twittt.id}
          twittt={twittt}
          isOwner={userObj.uid === twittt.creatorId ? true : false}
        />
      ))}
    </div>
  );
};

export default Home;
