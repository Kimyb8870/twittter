import React, { useState, useEffect } from "react";
import Twittt from "../components/Twittt";
import { dbService } from "../fbInstance";

const Home = ({ userObj }) => {
  const [twittt, setTwittt] = useState("");
  const [twittts, setTwittts] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(twittt);
    console.log(userObj);
    await dbService.collection("twittts").add({
      text: twittt,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });

    setTwittt("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwittt(value);
  };

  const handleFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setFileUrl(result);
    };

    reader.readAsDataURL(theFile);
  };

  const handleClearPhoto = () => {
    setFileUrl(null);
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={twittt}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFileChange} />
        <input type="submit" value="Twittt" />
        {fileUrl && (
          <div>
            <img src={fileUrl} width="50px" height="50px" />
            <button onClick={handleClearPhoto}>Clear Image</button>
          </div>
        )}
      </form>
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
