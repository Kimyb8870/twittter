import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { firebaseInstance } from "../fbInstance";

const Auth = () => {
  const handleSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;

    switch (name) {
      case "google": {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        break;
      }
      case "github": {
        provider = new firebaseInstance.auth.GithubAuthProvider();
        break;
      }
    }
    console.log("here we go");

    firebaseInstance
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
        const user = result.user;

        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={handleSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={handleSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
