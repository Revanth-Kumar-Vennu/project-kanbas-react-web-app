import React, { useEffect, useState } from "react";
import {
  FaBan,
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaRocket,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import {
  addQuiz,
  deleteQuiz,
  setQuiz,
  setQuizzes,
  setSelectedQuiz,
  updateQuiz,
} from "./quizzesReducer";

function Quizzes() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const currentUserRole = useSelector(
    (state: KanbasState) => state.usersReducer.role
  );

  const isAdminOrFaculty =
    currentUserRole === "ADMIN" || currentUserRole === "FACULTY";

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const selectedQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.selectedQuiz
  );

  const dummmyQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.dummyQuiz
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("isAdminOrFaculty", isAdminOrFaculty);
    if (isAdminOrFaculty) {
      client
        .findQuizForCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)));
    } else {
      client
        .findQuizForCourse(courseId)
        .then((quizzes) =>
          dispatch(
            setQuizzes(
              quizzes.filter(
                (quiz: { isPublished: boolean }) => quiz.isPublished === true
              )
            )
          )
        );
    }
  }, [courseId, dispatch, isAdminOrFaculty]);

  const handleDelete = (quizId: string) => {
    client.deleteQuiz(quizId).then(() => {
      dispatch(deleteQuiz(quizId));
      setShowConfirm(false);
    });
  };

  const handlePublish = (quiz: any) => {
    dispatch(setQuiz({ ...quiz, isPublished: !quiz.isPublished }));
    quiz = { ...quiz, isPublished: !quiz.isPublished };
    client.updateQuiz(quiz).then(() => {
      dispatch(updateQuiz(quiz));
    });
  };

  const handleCreateQuiz = () => {
    client.createQuiz(courseId, dummmyQuiz).then((quiz) => {
      dispatch(addQuiz(quiz));
      dispatch(setQuiz(quiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    });
  };

  function getAvailabilityStatus(quiz: {
    availableDate: string | number | Date;
    untilDate: string | number | Date;
  }) {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.untilDate);

    if (currentDate > availableUntilDate) {
      return "Closed";
    } else if (
      currentDate >= availableDate &&
      currentDate <= availableUntilDate
    ) {
      return "Available";
    } else {
      return `Not available until ${formatDate(availableDate)}`;
    }
  }

  function formatDate(date: {
    toLocaleDateString: (
      arg0: undefined,
      arg1: { year: string; month: string; day: string }
    ) => any;
  }) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div style={{ marginRight: 55 }}>
      <div className="d-flex  mb-3 wd-module-buttons-group">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            aria-label="Search"
          />
        </div>
        {isAdminOrFaculty && (
          <div className="ms-auto">
            <button
              className="btn btn-danger me-2 wd-add-module"
              onClick={() => handleCreateQuiz()}
            >
              <FaPlus className="fas fa-plus me-2" /> Add Quiz
            </button>
            <button className="btn btn-secondary me-2 wd-module-button">
              <FaEllipsisV className="fas fa-ellipsis-v" />
            </button>
          </div>
        )}
      </div>
      <hr className="wd-todo-hr" />
      {quizList.length === 0 && (
        <div>
          {isAdminOrFaculty ? (
            <h4>Click on Add Quiz button to add a new quiz</h4>
          ) : (
            <h4>No Quizzes found for this course</h4>
          )}
        </div>
      )}
      {quizList.length > 0 && (
        <ul className="list-group wd-modules">
          <li
            className="list-group-item list-group-item-secondary wd-assignment-header"
            style={{ padding: 15 }}
          >
            <FaCaretDown className="fa fa-caret-down me-2" />
            <span style={{ paddingTop: 20, fontSize: 20 }}>
              Assignment Quizzes
            </span>
          </li>
          {quizList
            .filter((quiz) => quiz.course === courseId)
            .map((quiz) => (
              <li
                key={quiz._id}
                className="list-group-item wd-green-border wd-assignment-list align-items-center  d-flex"
              >
                <div>
                  <FaRocket
                    style={{ color: "green" }}
                    className="fa-solid fa-rocket me-2"
                  />
                </div>
                <div className="wd-assignment-div">
                  <Link
                    className="wd-assignment-name"
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                    onClick={() => {
                      dispatch(setSelectedQuiz(quiz));
                    }}
                  >
                    {quiz.title}
                  </Link>
                  {/* <Link
                  className="wd-assignment-name"
                  to={isAdminOrFaculty ? `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}` :`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview`}
                  onClick={() => {
                    dispatch(setSelectedQuiz(quiz));
                  }}
                >
                  {quiz.title}
                </Link> */}

                  <br />
                  <p className="wd-assignment-text">
                    <span className="wd-module-link">
                      {getAvailabilityStatus(quiz)}
                    </span>{" "}
                    | <b>Due</b> {quiz.dueDate?.split('T')[0]} | {quiz.points} pts |{" "}
                    {quiz?.questions?.length} {quiz?.questions?.length > 1 ? "Questions" : "Question"}
                  </p>
                </div>
                {isAdminOrFaculty && (
                  <div className="ms-auto">
                    {quiz.isPublished && (
                      <FaCheckCircle
                        style={{ fontSize: "22" }}
                        className="fas fa-check-circle text-success   me-2"
                      />
                    )}
                    {!quiz.isPublished && (
                      <FaBan
                        style={{ fontSize: "22" }}
                        className="fas fa-trash wd-trash-symbol text-danger me-2"
                      />
                    )}
                    <div className="dropdown">
                      <FaEllipsisV
                        className="fas fa-ellipsis-v wd-dots  me-2"
                        onClick={() => {
                          setShowDropdown(quiz._id);
                          setToggleDropdown(!toggleDropdown);
                        }}
                      />
                      <ul
                        className={
                          showDropdown === quiz._id && toggleDropdown
                            ? "dropdown-menu show"
                            : "dropdown-menu"
                        }
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              // Handle Edit action
                              navigate(
                                `/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`
                              );
                            }}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              dispatch(setQuiz(quiz));
                              console.log("quiz", quiz);
                              handlePublish(quiz);
                            }}
                          >
                            {quiz.isPublished ? " Unpublish" : " Publish"}
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setShowConfirm(true);
                              dispatch(setSelectedQuiz(quiz));
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      )}
      {showConfirm && (
        <div className="popup-container">
          <div className="popup" style={{ width: "25%" }}>
            <div>
              <h3>Are you sure you want to delete this Quiz?</h3>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(selectedQuiz._id)}
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
    </div>
  );
}

export default Quizzes;
