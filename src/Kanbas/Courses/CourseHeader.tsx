import { Link } from "react-router-dom";
import { FaBars, FaGlasses } from "react-icons/fa";
import "./index.css";
function CourseHeader({
  course_id,
  location,
  course,
}: {
  course_id: any;
  location: any;
  course: any;
 
}) {
  
  const course_navigation = [
    "Home",
    "Modules",
    "Piazza",
    "Assignments",
    "Grades",
    "People",
    "Panopto",
    "Zoom",
    "Discussions",
    "Announcements",
    "Pages",
    "Files",
    "Rubrics",
    "Outcomes",
    "Collaborations",
    "Syllabus",
    "Progress",
    "Settings",
  ];
  const parts = location.split("/");
  let inSubModule = false;
  let course_nav = "";
  // Get the last part of the URL
  const current_location = parts[parts.length - 1];
  if (course_navigation.includes(current_location)) {
    course_nav = current_location;
  } else {
    course_nav = parts[parts.length - 2];
    inSubModule = true;
  }
  return (
    <div className=" d-none d-md-block wd-course-header ">
      <div className=" row">
        <div className="col-10">
          <nav
            aria-label="breadcrumb"
            className="d-flex justify-content-between  old-navbar"
          >
            <FaBars className="main-theme wd-bars-icon" />
            <ol className="breadcrumb flex-grow-1 wd-current-location">
              <li className="breadcrumb-item">
                <Link
                  to={`/Kanbas/Courses/${course_id}/Home`}
                  className="main-theme"
                  style={{ textDecoration: "none" }}
                >
                  {course?.name} {course?.semester}
                </Link>
              </li>

              {inSubModule && (
                <>
                  <li
                    className="breadcrumb-item main-theme"
                    aria-current="page"
                  >
                    <Link
                      to={`/Kanbas/Courses/${course_id}/${course_nav}`}
                      className="main-theme"
                      style={{ textDecoration: "none" }}
                    >
                      {course_nav}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link
                      to={`/Kanbas/Courses/${course_id}/${course_nav}/${current_location}`}
                      style={{
                        textDecoration: "none",
                        color: "rgb(73, 73, 73)",
                      }}
                    >
                      {current_location}
                    </Link>
                  </li>
                </>
              )}
              {!inSubModule && (
                <li className="breadcrumb-item active" aria-current="page">
                  <Link
                    to={`/Kanbas/Courses/${course_id}/${course_nav}`}
                    style={{ textDecoration: "none", color: "rgb(73, 73, 73)" }}
                  >
                    {course_nav}
                  </Link>
                </li>
              )}
            </ol>
          </nav>
        </div>
        <button className="btn  wd-module-button col-2">
          <FaGlasses className="fas fa-glasses" /> Student View
        </button>
      </div>
      <hr className="wd-todo-hr" />
    </div>
  );
}

export default CourseHeader;
