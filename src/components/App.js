import AppRouter from "./AppRouter";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
