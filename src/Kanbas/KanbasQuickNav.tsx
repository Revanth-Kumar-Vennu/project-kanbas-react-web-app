import {
  FaBook,
  FaDesktop,
  FaHistory,
  FaInbox,
  FaQuestionCircle,
  FaRegArrowAltCircleRight,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaTachometerAlt,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function KanbasQuickNav() {
  document.getElementById("wd-main-container")?.classList.add("d-flex");
  const links = [
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2" /> },
    { label: "Commons", icon: <FaRegArrowAltCircleRight className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="wd-quick-nav">
      <ul className="wd-kanbas-quick-navigation-list">
        <li>
          <div className="d-flex">
            <img
              className="wd-neu-img"
              src="../../../images/northeastern.jpg"
              alt=""
            />
            <Link to="" className="ms-auto">
              <button
                className="btn wd-kanbas-navigation-bars-btn"
                type="button"
                onClick={handleGoBack}
              >
                <FaTimes className="fa-solid fa-lg" />
              </button>
            </Link>
          </div>
        </li>
        {links.map((link) => (
          <li>
            <Link
              to={link.label === "Dashboard" ? `/Kanbas/${link.label}` : `#`}
              className="wd-module-link"
            >
              <span style={{ marginRight: 15 }}>{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KanbasQuickNav;
