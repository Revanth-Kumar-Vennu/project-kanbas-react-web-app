import { Link, useLocation, Navigate } from "react-router-dom";
import neu from "../../images/northeastern.jpg";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaInbox,
  FaHistory,
  FaDesktop,
  FaQuestionCircle,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { isAuthenticated } from "../Users/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../store";
import { setUser, setUserAuth } from "../Users/userReducer";
import * as client from "../Users/client";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2 wd-account" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2" /> },
    { label: "Commons", icon: <FaRegArrowAltCircleRight className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Check authentication status
  const [authenticated, setAuthenticated] = useState(false);
  const userAuth = useSelector(
    (state: KanbasState) => state.usersReducer.authenticated
  );

  const getProfile = async () => {
    const account = await client.profile();
    dispatch(setUser(account.role));
  };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticatedResult = await isAuthenticated();
        getProfile();
        setAuthenticated(isAuthenticatedResult);
      } catch (error: any) {
        if (error.response.status == 401) {
          setAuthenticated(false);
        }
        console.error("Error checking authentication:", error);
      }
    };
    checkAuthentication();
  }, [userAuth]);

  // Redirect to profile page if authenticated
  // if (authenticated) {
  //   return <Navigate to="/Kanbas/Account/Profile" />;
  // }

  // Render side navigation only if authenticated
  return (
    <>
      {authenticated && (
        <div className="side-nav-container" style={{height:'100%'}}>
          <ul className="wd-kanbas-navigation">
            <li>
              <Link to="http://northeastern.edu">
                <img className="wd-neu-img" src={neu} alt="" />
              </Link>
            </li>
            {links.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname.includes(link.label) ? "wd-active" : ""
                } ${pathname.includes("Account") ? "wd-account" : ""}`}
              >
                <Link to={`/Kanbas/${link.label}`}>
                  {" "}
                  {link.icon} <br /> {link.label}{" "}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default KanbasNavigation;
