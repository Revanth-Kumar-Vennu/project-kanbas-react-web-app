import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import QuickNav from "./QuickNav";
import KanbasQuickNav from "./KanbasQuickNav";
import { useState, useEffect } from "react";
import store, { KanbasState } from "./store";
import { Provider, useSelector } from "react-redux";
import axios from "axios";
import Account from "./Account";

function Kanbas() {
  const { pathname } = useLocation();
  const [courses, setCourses] = useState<any[]>([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const COURSES_API = `${API_BASE}/api/courses`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  
  useEffect(() => {
    findAllCourses();
  }, []);

  const dummyCourse = {
    _id: "0",
    name: "New Course",
    number: "New Course Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    theme: "light-grey",
    semester: "Fall 2023",
  };
  const [course, setCourse] = useState(dummyCourse);
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    console.log(response.data);
    setCourses([...courses, response.data]);
  };

  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  return (
    <>
      <Provider store={store}>
        {pathname.includes("KanbasQuickNav") ? (
          <KanbasQuickNav />
        ) : (
          <QuickNav courses={courses} />
        )}
        <div
          className="d-flex"
          id="wd-main-container"
          style={{ display: "block" }}
        >
          <div
            className="d-none d-md-block "
            style={{ position: "fixed", height: "100%" }}
          >
            <KanbasNavigation />
          </div>
          <div style={{ flexGrow: 1 }} className="wd-main-div">
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="Dashboard"
                element={
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                }
              />
              <Route path="Courses/:courseId/*" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </>
  );
}
export default Kanbas;
