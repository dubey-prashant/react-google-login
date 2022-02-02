import "./App.css";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  );
  const handleSuccess = (googleData) => {
    console.log(googleData.profileObj);
    setUser(googleData.profileObj);
    localStorage.setItem("userData", JSON.stringify(googleData.profileObj));
  };
  const handleFailure = (error) => {
    alert(error);
  };
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login</h1>
        {user ? (
          <>
            <p>Name:{user.name} </p>
            <p>Email:{user.email} </p>
            <button onClick={logOut}>Log Out</button>
          </>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy="single_host_origin"
          ></GoogleLogin>
        )}
      </header>
    </div>
  );
}

export default App;
