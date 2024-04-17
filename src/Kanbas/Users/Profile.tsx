import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
    _id: "",
  });
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const save = async () => {
    await client.updateUser(profile);
    setSuccess(true);
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  return (
    <div
      className="container-fluid"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {success && (
        <div className="alert alert-success" role="alert">
          Profile updated successfully
        </div>
      )}
      <h1>Profile</h1>
      <Link to="/Kanbas/Account/Admin/Users">
        <button className="btn btn-warning w-100">Users</button>
      </Link>
      {profile && (
        <div>
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <br />
          <label className="form-label">Password</label>
          <input
            className="form-control"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <br />
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <br />
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <br />
          <label className="form-label">Date of Birth</label>
          <input
            className="form-control"
            value={profile?.dob?.split("T")[0]}
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <br />
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <br />
          <label className="form-label">Role</label>
          <select
            className="form-control"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <br />
          <button className="btn btn-primary" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger" onClick={signout}>
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
