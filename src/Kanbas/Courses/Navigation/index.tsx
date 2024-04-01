import { Link, useLocation } from "react-router-dom";
import "./index.css";
function CourseNavigation({ course_id, course }: { course_id: string, course: any }) {
  const links = [
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
  const { pathname } = useLocation();
  // const course = courses.find((course) => course._id === course_id);

  return (
    <div className="wd-course-nav-container d-none d-md-block ">
    <span className="wd-semester">{course?._id} {course?.semester} Semes.....</span>
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}
export default CourseNavigation;
