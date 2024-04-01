import React, { useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "../../index.css";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import {
  addAssignment,
  setAssignment,
  updateAssignment,
} from "../assignmentsReducer";
function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  console.log(courseId, assignmentId);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const assignments = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const dummyAssignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.dummyAssignment
  );
  const handleSave = () => {
    if (pathname.includes("new")) {
      client.createAssignment(courseId, assignment).then(() => {
      dispatch(addAssignment({ ...assignment, course: courseId }));
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      });
    } else {
      client.updateAssignment(assignment).then(() => {
        dispatch(updateAssignment(assignment));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      });
    }
   
  };

  useEffect(() => {
    if (assignmentId !== "new") {
      const currentAssignment = assignments.find(
        (assignment) => assignment._id === assignmentId
      );
      if (currentAssignment) {
        dispatch(setAssignment(currentAssignment));
      }
    } else {
      dispatch(setAssignment(dummyAssignment));
    }
  }, [assignmentId, assignments, dummyAssignment, dispatch]);

  return (
    <div style={{ marginRight: 55 }}>
      <div className="row">
        <div className="col-12">
          <button type="button" className="btn wd-module-button float-right">
            <FaEllipsisV className="fas fa-ellipsis-v black-color" />
          </button>
          <button type="button" className="wd-publish-button btn btn-light">
            <FaCheckCircle className="fas fa-check-circle button-color" />
            <span className="button-color">
              <b>Published </b>
            </span>
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <label>Assignment Name</label>
          <input
            id="assignment-name"
            type="text"
            value={assignment?.title}
            className="form-control"
            onChange={(e) =>
              dispatch(setAssignment({ ...assignment, title: e.target.value }))
            }
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-12">
          <label>Description</label>
          <textarea
            id="description"
            value={assignment?.description}
            className="form-control"
            onChange={(e) =>
              dispatch(
                setAssignment({ ...assignment, description: e.target.value })
              )
            }
          ></textarea>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-3 set-label wd-form-items">
          <label>Points</label>
        </div>
        <div className="col-9 wd-form-items">
          <input
            type="number"
            value={assignment?.points}
            className="form-control"
            onChange={(e) =>
              dispatch(setAssignment({ ...assignment, points: e.target.value }))
            }
          />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-3 set-label wd-form-items">
          <label>Assign</label>
        </div>
        <div className="col-9 wd-form-items">
          <div className="wd-asign-table">
            <div className="wd-assign-div-padding-top">
              <div>
                <b>Due</b>
              </div>
              <div>
                <input
                  type="date"
                  value={assignment.dueDate}
                  className="form-control"
                  min={assignment.availableFrom}
                  onChange={(e) => {
                    dispatch(
                      setAssignment({ ...assignment, dueDate: e.target.value })
                    );
                    console.log(assignment);
                  }}
                />
              </div>
            </div>

            <div className="wd-assign-div-padding-top">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="available-from">
                    <b>From</b>
                  </label>
                  <input
                    id="available-from"
                    type="date"
                    value={assignment.availableFrom}
                    className="form-control"
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableFrom: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="until">
                    <b>Until</b>
                  </label>
                  <input
                    id="until"
                    type="date"
                    value={assignment.availableUntil}
                    min={assignment.availableFrom}
                    className="form-control"
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableUntil: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <button
          onClick={() => handleSave()}
          className="btn  btn-danger ms-2 float-end"
        >
          Save
        </button>
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn  btn-light float-end"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
export default AssignmentEditor;
