import React, { useState, useEffect } from "react";
import { dbService } from "../fbInstance";

const Home = () => {
  const [twittt, setTwittt] = useState("");
  const [twittts, setTwittts] = useState([]);

  const getTwittts = async () => {
    const data = await dbService.collection("twittts").get();
    data.forEach((doc) => {
      const twitttObject = {
        key: doc.id,
        id: doc.id,
        ...doc.data(),
      };

      setTwittts((prev) => [twitttObject, ...prev]);
    });
  };

  useEffect(() => {
    getTwittts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(twittt);
    await dbService.collection("twittts").add({
      twittt,
      createdAt: Date.now(),
    });

    setTwittt("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setTwittt(value);
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
        <input type="submit" value="Twittt" />
      </form>
      {twittts?.map((twittt) => (
        <>
          <h4 key={twittt.key}>{twittt.twittt}</h4>
        </>
      ))}
    </div>
  );
};

export default Home;
