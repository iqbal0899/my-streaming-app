import { useState } from "react";
import Home from "./pages/home"
import Login from "./pages/login";


function App(){
  const [auth, setAuth] = useState(null);

  const handleLoginSuccess = ({email, password}) => {
    setAuth({email, password})
  };

  if (!auth) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return(
    <div>
      
      <Home />

    </div>
  )
}

export default App;