import { Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaBars,
  FaBook,
  FaBullhorn,
  FaBullseye,
  FaChartBar,
  FaChevronDown,
  FaCircle,
  FaClipboard,
  FaCog,
  FaComment,
  FaCrosshairs,
  FaFile,
  FaGlasses,
  FaHome,
  FaPlug,
  FaRocket,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import KanbasQuickNav from "../KanbasQuickNav";
import { useState } from "react";

function QuickNav({ courses }: { courses: any }) {
  document.getElementById("wd-main-container")?.classList.add("d-flex");
  const [isChevronDown, setIsChevronDown] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleIcon = () => {
    setIsChevronDown((prevState) => !prevState);
    setIsCollapsed((prevState) => !prevState);
    if (!isCollapsed) {
      console.log("hide");
      document.getElementById("wd-main-container")?.classList.remove("d-flex");
      document.getElementById("wd-main-container")?.classList.add("d-none");
    } else {
      console.log("show");
      document.getElementById("wd-main-container")?.classList.remove("d-none");
      document.getElementById("wd-main-container")?.classList.add("d-flex");
    }
  };

  const links = [
    {
      name: "Home",
      icon: <FaHome className="fa-solid fa-house me-2" />,
      link_to: "/Kanbas",
    },
    {
      name: "Modules",
      icon: <FaCrosshairs className="fa fa-crosshairs me-2" />,
    },
    { name: "Piazza", icon: <FaPlug className="fa fa-plug me-2" /> },
    { name: "Zoom Meetings", icon: <FaPlug className="fa fa-plug me-2" /> },
    { name: "Assignments", icon: <FaFile className="fas fa-file me-2" /> },
    { name: "Quizzes", icon: <FaRocket className="fa-solid fa-rocket me-2" /> },
    { name: "Grades", icon: <FaBook className="fa fa-book me-2" /> },
    { name: "People", icon: <FaUser className="fa fa-user me-2" /> },
    { name: "Panopto Video", icon: <FaPlug className="fa fa-plug me-2" /> },
    {
      name: "Discussions",
      icon: <FaComment className="fa-regular fa-comments me-2" />,
    },
    {
      name: "Announcements",
      icon: <FaBullhorn className="fa fa-bullhorn me-2" />,
    },
    { name: "Pages", icon: <FaBook className="fa fa-book me-2" /> },
    { name: "Files", icon: <FaFile className="fa fa-file me-2" /> },
    {
      name: "Rubrics",
      icon: <FaClipboard className="fa-solid fa-clipboard me-2" />,
    },
    {
      name: "Outcomes",
      icon: <FaBullseye className="fa-solid fa-bullseye me-2" />,
    },
    {
      name: "Collaborations",
      icon: <FaCircle className="fa-regular fa-circle me-2" />,
    },
    { name: "Syllabus", icon: <FaBook className="fa fa-book me-2" /> },
    {
      name: "Progress Reports",
      icon: <FaChartBar className="fa-solid fa-chart-column me-2" />,
    },
    { name: "Settings", icon: <FaCog className="fa fa-cog me-2" /> },
  ];
  const { pathname } = useLocation();
  const path = pathname.split("/");
  let course: any;
  let main_window = false;
  let display = "none";
  console.log(path);
  if (path.length === 3) {
    main_window = true;
    display = path[path.length - 1];
  } else if (path.length >= 4) {
    const course_id = path[3];
    course = courses.find((course: any) => course._id === course_id);
    display = path[path.length - 1];
  }
  return (
    <>
      <div className="d-flex d-block d-md-none wd-kanbas-navigation-dropdown">
        <Link
          to="/Kanbas/KanbasQuickNav"
          className="wd-quick-nav-btn wd-quick-nav-bars"
        >
          <button className="btn ">
            <FaBars
              className="fas fa-bars"
              style={{ color: "white", marginBottom: 10 }}
            />
          </button>
        </Link>
        <Routes>
          <Route path="Kanbas/KanbasQuickNav" element={<KanbasQuickNav />} />
        </Routes>

        <div className="text-center wd-nav-bar-content flex-grow-1 wd-nav-btns-grp">
          {main_window && (
            <Link to={`/Kanbas/${display}`} className="wd-quick-nav-header">
              {display}
            </Link>
          )}
          {!main_window && (
            <Link
              to={
                path.length === 6
                  ? `/Kanbas/Courses/${course?._id}/${
                      path[path.length - 2]
                    }/${display}`
                  : `/Kanbas/Courses/${course?._id}/${display}`
              }
              className="wd-quick-nav-header"
            >
              {course?.name}.{course?.semester}
              <br />
              {display}
            </Link>
          )}
        </div>
        {pathname.includes("Dashboard") ? (
          <></>
        ) : (
          <div className="wd-nav-btns-grp float-end">
            <button className="btn wd-bg-black">
              <FaGlasses className="fas fa-glasses wd-nav-bar-content " />
            </button>

            <button
              className="btn wd-quick-nav-btn ms-auto"
              type="button"
              onClick={toggleIcon}
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample1"
              aria-expanded="false"
              aria-controls="collapseWidthExample1"
            >
              {isChevronDown ? (
                <FaChevronDown style={{ color: "white" }} />
              ) : (
                <FaTimes style={{ color: "white" }} />
              )}
            </button>
          </div>
        )}
      </div>
      <div
        className="collapse collapse-horizontal wd-quick-nav"
        id="collapseWidthExample1"
      >
        <ul
          className="wd-course-quick-navigation-list"
          style={{ marginLeft: 10 }}
        >
          {links.map((link, index) => (
            <li style={{ marginBottom: 10 }}>
              <Link
                to={`/Kanbas/Courses/${course?._id}/${link.name}`}
                className="wd-module-link"
                onClick={() => {
                  const dropdown = document.getElementById(
                    "collapseWidthExample1"
                  );
                  if (dropdown) {
                    dropdown.classList.remove("show");
                    toggleIcon();
                  }
                }}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default QuickNav;
