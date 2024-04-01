import React from "react";
import "./index.css";
import {
  FaArrowUp,
  FaBan,
  FaBell,
  FaBullhorn,
  FaBullseye,
  FaCalendar,
  FaChartBar,
  FaCheckCircle,
  FaCircle,
  FaFileImport,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Status({ course_id, course }: { course_id: string, course: any}) {
  const lectures = [
    {
      name: "Lecture 1",
      date: "Sep 11 at 11:45am",
    },
    {
      name: "Lecture 2",
      date: "Sep 11 at 6pm",
    },
    {
      name: "Lecture 3",
      date: "Sep 11 at 7pm",
    },
  ];
  console.log(course_id);

  return (
    <div style={{ maxWidth: "25%" }} className="d-none d-xl-block float-end">
      <span>Course Status</span>
      <div className="wd-btns-1">
        <button className="btn btn-secondary wd-module-button">
          <FaBan className="fa fa-ban" /> Unpublish
        </button>
        <button className="btn btn-success">
          <FaCheckCircle className="fas fa-check-circle" />
          Published
        </button>
      </div>
      <div className="wd-btns-2">
        <button className="btn btn-secondary wd-module-button">
          <FaFileImport className="fa-solid fa-file-import" />
          Import Existing Content
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaArrowUp className="fa-solid fa-file-arrow-up" />
          Import from Commons
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaBullseye className="fa fa-bullseye" /> Choose Home Page
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaChartBar className="fa-solid fa-chart-column" /> View Course Stream
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaBullhorn className="fa fa-bullhorn" /> New Announcement
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaChartBar className="fa-solid fa-chart-column" /> New Analytics
        </button>
        <button className="btn btn-secondary wd-module-button">
          <FaBell className="fa fa-bell" /> View Course Notifications
        </button>
      </div>
      <div className="wd-todo">
        <span>To Do</span>
        <hr className="wd-todo-hr" />
        <div className="d-flex ">
          <FaCircle className="fas fa-circle main-theme" /> &nbsp;&nbsp;&nbsp;
          <div className="wd-todo-text">
            <Link to="#" className="wd-module-link">
              Grade A1
            </Link>
            <br />
            <small className="wd-description">
              100 points • Sep 18 at 11:59pm
            </small>
          </div>{" "}
          &nbsp;&nbsp;&nbsp;
          <FaTimes className="fas fa-times close-icon wd-close" />
        </div>
      </div>
      <div className="wd-calendar">
        <div className="d-flex ">
          <span>Coming Up</span>
          <div className="float-end" style={{ marginLeft: "auto" }}>
            <FaCalendar className="far fa-calendar-alt" />
            <Link to="#" className="wd-module-link">
              View Calendar
            </Link>
          </div>
        </div>
        <hr className="wd-todo-hr" />
      </div>

      {lectures.map((lecture) => (
        <div className="d-flex">
          <FaCalendar className="far fa-calendar-alt cal-icon" />
          &nbsp;&nbsp;&nbsp;
          <div>
            <Link to="#" className="wd-module-link">
              {lecture.name}
            </Link>
            <br />
            <small className="wd-description">
              {" "}
              {course?.number}.{course?.semester}
              <br />
              {lecture.date}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Status;
