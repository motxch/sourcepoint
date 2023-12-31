import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import DevCoveLogo from "../assets/DevCoveLogo.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import Dragon from "../assets/Dragon.png"

// CSS styles for the login container
const containerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

// CSS styles for the logo container
const logoContainerStyles = {
  flex: "1",
  textAlign: "center",
  display: "flex",
  alignItems: "center", // Center vertically
  justifyContent: "flex-end", // Center horizontally
};

// CSS styles for the scaled-down logo
const logoStyles = {
  width: "70%", // Adjust the width as needed
  height: "auto",
};

// CSS styles for the login form container
const loginContainerStyles = {
  flex: "1",
  textAlign: "center",
  display: "flex",
  flexDirection: "column", // Adjust the alignment
};

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Hmm, something went wrong. Please verify your username and password and try again.");
    }
  }

  return (
    <div className="container" style={containerStyles}>
      <div className="login-wrapper" style={loginContainerStyles}>
        <div className="login-wrapper-inner">
          <h1 className="heading" style={{ fontSize: "4em" , marginBottom: "-.10em"}} >DevCove</h1>
          <p className="sub-heading">
          Where Innovation Meets Opportunity
          </p>

          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({
                  ...credentails,
                  email: event.target.value,
                })
              }
              type="email"
              className="common-input"
              placeholder="Email"
            />
            <input
              onChange={(event) =>
                setCredentials({
                  ...credentails,
                  password: event.target.value,
                })
              }
              type="password"
              className="common-input"
              placeholder="Password"
            />
          </div>
          <button onClick={login} className="login-btn">
            Sign in
          </button>
        </div>

        <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
          <p className="go-to-signup">
            New to DevCove?{" "}
            <span
              className="join-now"
              onClick={() => navigate("/register")}
      style={{ cursor: "pointer" }}
            >
              Join now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
