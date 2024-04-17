import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await client.isAuthenticated();
        if (isAuthenticated) {
          navigate("/Kanbas/Account/Profile");
        }
      } catch (error) {
        
      }
    };

    checkAuthentication();
  }, [navigate]);

  const signin = async () => {
    try {
      await client.signin(credentials).then((response) => {
        console.log("response", response);
        navigate("/Kanbas/Account/Profile");
      });
      
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="container-fluid">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form
       
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Sign In</h1>
        <label className="form-label">Username</label>
        <input
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          style={{ marginBottom: "10px", width: "300px" }}
          required
          className="form-control"
        />
        <br />
        <label className="form-label">Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            style={{ marginBottom: "10px", width: "300px" }}
            required
            className="form-control"
          />{" "}
          &nbsp;
          <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </label>
        </div>
        <br />
        <div className="d-flex">
          <button
            onClick={signin}
            className="btn btn-primary"
            disabled={!credentials.username || !credentials.password}
          >
            Sign In
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-primary"
            onClick={() => navigate("/Kanbas/Account/Signup")}
          >
            {" "}
            Sign Up{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
