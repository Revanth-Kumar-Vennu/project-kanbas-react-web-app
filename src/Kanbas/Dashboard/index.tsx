import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FaCaretDown, FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";

function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showUpdateCourseButton, setshowUpdateCourseButton] = useState(false);
  const [showAddCourseButton, setshowAddCourseButton] = useState(false);

  const handleDropDownClick = () => {
    setshowAddCourseButton(true);
    setShowAddCourse(!showAddCourse);
  };
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

  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <h3>
        Add/Edit Course <FaCaretDown onClick={handleDropDownClick} />
      </h3>
      {showAddCourse && (
        // <form>
        <div>
          <div className="row">
            <div className="mb-3 col-6">
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                className="form-control"
                id="courseName"
                placeholder="Course Name"
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                value={course.name}
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="courseNumber" className="form-label">
                Course Number
              </label>
              <input
                type="text"
                className="form-control"
                id="courseNumber"
                placeholder="Course Number"
                value={course.number}
                onChange={(e) =>
                  setCourse({ ...course, number: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-6">
              <label htmlFor="courseNumber" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                placeholder="Start Date"
                onChange={(e) =>
                  setCourse({ ...course, startDate: e.target.value })
                }
                value={course.startDate}
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="courseNumber" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                placeholder="End Date"
                min={course.startDate}
                onChange={(e) =>
                  setCourse({ ...course, endDate: e.target.value })
                }
                value={course.endDate}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {showAddCourseButton && (
              <button
                className="btn btn-success"
                onClick={addNewCourse}
              >
                Add Course
              </button>
            )}
            {showUpdateCourseButton && (
              <button
                className="btn btn-success"
                onClick={()=>{updateCourse();
                    setShowAddCourse(false);
                  setshowAddCourseButton(true);
                  setshowUpdateCourseButton(false);}}
              >
                Update Course
              </button>
            )}
            &nbsp;&nbsp;
            <button className="btn btn-danger" onClick={()=>{
              setShowAddCourse(false);
              setshowAddCourseButton(true);
              setshowUpdateCourseButton(false);
              setCourse(dummyCourse);
            }}>Cancel</button>
          </div>
          </div>
      )}
      <hr />
      <div className="d-flex">
        <h2>Published Courses</h2>
      </div>
      <div className="row">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="col"
              style={{ width: 300, margin: 12 }}
            >
              <div className="wd-card">
                <div className={`wd-upper-half wd-bg-${course.theme}`}>
                  <FaEllipsisV className="wd-dots" />
                </div>
                <div className="wd-lower-half">
                  <Link
                    className="wd-link"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                  >
                    <div className={`wd-fontcolor-${course.theme}`}>
                      {course.name}
                    </div>
                    <div className="wd-course-name wd-fontcolor-light-grey">
                      {course.name}.{course.number}
                    </div>
                    <div className="wd-course-term wd-fontcolor-light-grey">
                      202410_1 Spring 2024 Semester Full Term
                    </div>
                  </Link>
                  <FaEdit
                    className="fs-5 wd-edit"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowAddCourse(true);
                      setshowUpdateCourseButton(true);
                      setshowAddCourseButton(false);
                      setCourse(course);
                      window.scrollTo({ top: 0, behavior: "smooth"})
                    }}
                  />
                  <FaTrash
                    className="fs-5 wd-edit"
                    onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
