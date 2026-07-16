import { useState } from "react";
import Login from "./pages/login"
import ProfileDropdown from "./components/profileDrowpdown";


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
      
      <home />

    </div>
  )
}

export default App;