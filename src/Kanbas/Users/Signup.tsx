import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { setUser, setUserAuth } from "./userReducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async (e:any) => {
    e.preventDefault();
    try {
      await client.signup(user);
      dispatch(setUserAuth(true));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form
        onSubmit={signup}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Signup</h1>
        <label className="form-label">Username</label>
        <input
          className="form-control"
          value={user.username}
          required
          style={{ marginBottom: "10px", width: "300px" }}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label className="form-label">Password</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            value={user.password}
            required
            style={{ marginBottom: "10px", width: "300px" }}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </label>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!user.username || !user.password}
          >
            Signup
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-primary"
            onClick={() => navigate("/Kanbas/Account/Signin")}
          >
            {" "}
            Sign In{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
function dispatch(arg0: { payload: any; type: "users/setUserAuth"; }) {
  throw new Error("Function not implemented.");
}

