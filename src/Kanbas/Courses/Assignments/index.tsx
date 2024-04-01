import React, { useEffect, useState } from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import snip from "../../../images/snip.png";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import {
  deleteAssignment,
  setSelectedAssignment,
  setAssignments,
} from "./assignmentsReducer";
function Assignments() {
  const { courseId } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const assignmentList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const selectedAssignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.selectedAssignment
  );

  const dispatch = useDispatch();
  useEffect(() => {
    client
      .findAssignmentForCourse(courseId)
      .then((modules) => dispatch(setAssignments(modules)));
  }, [courseId, dispatch]);
  const handleDelete = (assignment_id: string) => {
    client.deleteAssignment(assignment_id).then(() => {
      dispatch(deleteAssignment(assignment_id));
      setShowConfirm(false);
    });
  };
  return (
    <div style={{ marginRight: 55 }}>
      <div className="d-flex  mb-3 wd-module-buttons-group">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Assignment"
            aria-label="Search"
          />
        </div>
        <div className="ms-auto">
          <button className="btn btn-secondary me-2 wd-module-button">
            <FaPlus className="fas fa-plus me-2" /> Group
          </button>

          <Link to={`/Kanbas/Courses/${courseId}/Assignments/new`}>
            {" "}
            <button className="btn btn-danger me-2 wd-add-module">
              <FaPlus className="fas fa-plus me-2" /> Assignment
            </button>{" "}
          </Link>
          <button className="btn btn-secondary me-2 wd-module-button">
            <FaEllipsisV className="fas fa-ellipsis-v" />
          </button>
        </div>
      </div>
      <hr className="wd-todo-hr" />

      <ul className="list-group wd-modules">
        <li
          className="list-group-item list-group-item-secondary wd-assignment-header"
          style={{ padding: 15 }}
        >
          <FaEllipsisV className="fas fa-ellipsis-v wd-dots" />
          <FaCaretDown className="fa fa-caret-down me-2" />
          <span style={{ paddingTop: 20, fontSize: 20 }}>ASSIGNMENTS</span>
          <div className="float-end">
            <div className="btn-group">
              <label className="btn wd-weightage">40% of Total</label>{" "}
              &nbsp;&nbsp;
              <ul className="dropdown-menu"></ul>
            </div>

            <FaPlus className="fas fa-plus me-4 wd-dots" />
            <FaEllipsisV className="fas fa-ellipsis-v wd-dots" />
          </div>
        </li>
        {showConfirm && (
          <div className="popup-container">
            <div className="popup" style={{ width: "25%" }}>
              <div>
                <h3>Are you sure you want to delete this Assignment?</h3>

                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(selectedAssignment._id)}
                  >
                    YES
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() => setShowConfirm(false)}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {assignmentList
          .filter((assignment) => assignment.course === courseId)
          .map((assignment) => (
            <li className="list-group-item wd-green-border wd-assignment-list align-items-center  d-flex">
              <div className="d-flex">
                <FaEllipsisV className="fas fa-ellipsis-v wd-dots" />
              </div>
              <div>
                <img src={snip} className="wd-assignment-img" alt="" />
              </div>
              <div className="wd-assignment-div">
                <Link
                  className="wd-assignment-name"
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                  onClick={() => {
                    dispatch(setSelectedAssignment(assignment));
                  }}
                >
                  {assignment.title}
                </Link>

                <br />
                <p className="wd-assignment-text">
                  {assignment.description} | <br />
                  <span className="wd-module-link">
                    Multiple Modules
                  </span> | <b>Due</b> {assignment.dueDate} |{" "}
                  {assignment.points} pts
                </p>
              </div>
              <div className="ms-auto">
                <FaCheckCircle className="fas fa-check-circle text-success wd-check-symbol  me-2" />
                <FaEllipsisV className="fas fa-ellipsis-v  wd-dots  me-2" />
                <FaTrash
                  className="fas fa-trash wd-dots"
                  onClick={() => {
                    setShowConfirm(true);
                    dispatch(setSelectedAssignment(assignment));
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Assignments;
