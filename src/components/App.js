import AppRouter from "./AppRouter";
import { useState, useEffect } from "react";
import { authService } from "../fbInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    console.log("useEffect fired");
    authService.onAuthStateChanged((user) => {
      console.log("on AuthState Changed fired");
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  console.log(init);
  console.log(isLoggedIn);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing"}
    </div>
  );
}

export default App;
