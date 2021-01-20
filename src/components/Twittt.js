import React, { useState } from "react";
import { dbService } from "../fbInstance";

const Twittt = ({ twittt, isOwner }) => {
  const { id, text, fileUrl } = twittt;
  const [editing, setEditing] = useState(false);
  const [newTwittt, setNewTwittt] = useState("");

  const handleDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete twittt?");
    if (ok) {
      //delete
      await dbService.collection("twittts").doc(id).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const handleChange = (e) => {
    setNewTwittt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbService
      .collection("twittts")
      .doc(id)
      .update({ ...twittt, text: newTwittt });

    setEditing(false);
    setNewTwittt("");
  };

  return (
    <div>
      <h4>{text}</h4>
      {fileUrl && <img src={fileUrl} width="50px" height="50px" />}
      {isOwner && (
        <>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button>
          {editing ? (
            <form onSubmit={handleSubmit}>
              <input
                value={newTwittt}
                onChange={handleChange}
                placeholder="Edit this"
              />
              <input type="submit" value="Submit" />
            </form>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Twittt;
