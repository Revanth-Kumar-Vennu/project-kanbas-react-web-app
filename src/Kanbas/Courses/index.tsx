import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import CourseNavigation from "./Navigation";
import CourseHeader from "./CourseHeader";
import Module from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  // const course = courses.find((course) => course._id === courseId);
  return (
    <div>
      <CourseHeader
        course_id={course?._id || ""}
        location={pathname}
        course={course}
      />
      <div className="d-flex wd-main-content">
        <CourseNavigation course_id={course?._id || ""} course={course} />
        <div className="flex-grow-1 wd-courses-container">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route
              path="Home"
              element={<Home course_id={course?._id || ""} course={course}/>}
            />
            <Route path="Modules" element={<Module />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
