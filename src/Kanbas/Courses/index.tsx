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
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import DetailsEditor from "./Quizzes/Editor/DetailsEditor";
import QuestionsEditor from "./Quizzes/Editor/QuestionsEditor";
import PreviewEditor from "./Quizzes/Preview";

function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
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
              element={<Home course_id={course?._id || ""} course={course} />}
            />
            <Route path="Modules" element={<Module />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Grades" element={<Grades />} />
            <Route
              path="Quizzes/:quizId/Preview"
              element={<PreviewEditor />}
            />
            <Route
              path="Quizzes/:quizId/edit/DetailsEditor"
              element={<DetailsEditor />}
            />
            
            <Route
              path="Quizzes/:quizId/edit/QuestionsEditor"
              element={<QuestionsEditor />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
