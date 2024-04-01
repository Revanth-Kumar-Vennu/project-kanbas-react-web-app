import { Link, useLocation } from "react-router-dom";
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
  return (
    <ul className="wd-kanbas-navigation">
      <li>
        <Link to="http://northeastern.edu">
          <img className="wd-neu-img" src={neu} alt="" />
        </Link>
      </li>
      {links.map((link, index) => (
        <li
          key={index}
          className={`${pathname.includes(link.label) ? "wd-active" : ""} ${
            pathname.includes("Account") ? "wd-account" : ""
          }`}
        >
          <Link to={`/Kanbas/${link.label}`}>
            {" "}
            {link.icon} <br /> {link.label}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;
