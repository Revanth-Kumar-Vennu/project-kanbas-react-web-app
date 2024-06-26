import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../../quizzesReducer";
import * as client from "../../client";
import { KanbasState } from "../../../../store";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import NavigationTabs from "../Nav";
import "react-quill/dist/quill.snow.css";
import "../../index.css";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

function DetailsEditor() {
  const dispatch = useDispatch();
  
  const { quizId } = useParams();
  const { courseId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const [description, setDescription] = useState(quiz.description);
  const navigate = useNavigate();

  const handleSave = () => {
    client.updateQuiz(quiz).then(() => {
      dispatch(setQuiz(quiz));
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleSaveAndPublish = () => {
    client.updateQuiz({ ...quiz, isPublished: true }).then(() => {
      dispatch(setQuiz({ ...quiz, isPublished: true }));
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  useEffect(() => {
    client.findQuizByID(quizId).then((quiz) => {
      dispatch(setQuiz(quiz));
      // setDescription(quiz.description);
    });
  }, [dispatch, quizId]);

  const handleDescriptionChange = (newDescription: any) => {
    setDescription(newDescription);
    dispatch(setQuiz({ ...quiz, description: newDescription }));
  };

  const formatDate = (date: string) => {
    return date.split("T")[0];
  };

  // Define custom toolbar options for font size and color
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["small", "large", "huge"] }],
      [{ color: [] }, { background: [] }], // font color/background color
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="">
      <div
        className="d-flex justify-content-end "
        style={{ marginRight: "5%" }}
      >
        <strong>Points </strong>&nbsp;{quiz.points}
        <span>
          {quiz.isPublished ? (
            <span>
              <FaCheckCircle
                style={{ color: "green", marginLeft: "20" }}
                className="fas fa-check-circle"
              />
              Published
            </span>
          ) : (
            <span>
              <FaBan
                style={{ color: "red", marginLeft: "20" }}
                className="fas fa-ban"
              />
              Not Published
            </span>
          )}
        </span>{" "}
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-secondary me-2 wd-module-button">
          <FaEllipsisV className="fas fa-ellipsis-v" />
        </button>
      </div>
      <hr className="wd-todo-hr" style={{ marginRight: "5%" }} />
      <NavigationTabs />
      <div style={{ marginTop: "3%", marginRight: "5%" }}>
        <input
          type="text"
          size={5}
          className="form-control"
          placeholder="Quiz Title"
          value={quiz.title}
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, title: e.target.value }))
          }
        />
        <br />
        <span>Quiz Instructions</span>
        <br />
        <br />
        {/* <Editor
          apiKey="ctsf9konqnxvij7fpkpaaemdrfbiuaruiy45n8gvi61sm8dy" // Replace with your TinyMCE API key
          initialValue={quiz.description}
          onEditorChange={(newDescription) =>
            dispatch(setQuiz({ ...quiz, description: newDescription }))
          }
          init={{
            height: 200,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | table",
          }}
        /> */}
        <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          modules={modules}
          style={{ height: "20vh",marginBottom: "5%"}}
        />
        <br />
        <br />
        <div className="row">
          <div className="col-3">
            <span className="float-right">Quiz Type</span>
          </div>
          <div className="col-9">
            <select
              className="form-select"
              value={quiz.quizType}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, quizType: e.target.value }))
              }
              style={{ width: "50%" }}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-3">
            <span className="float-right">Assignment Group</span>
          </div>
          <div className="col-9">
            <select
              className="form-select"
              value={quiz.assignmentGroup}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))
              }
              style={{ width: "50%" }}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-9">
            <strong>Options</strong>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.checked }))
              }
            />
            &nbsp;<span>Shuffle Answers</span>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.isTimeLimited}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, isTimeLimited: e.target.checked }))
              }
            />
            &nbsp; &nbsp;
            <span>Time Limit</span>
            {quiz.isTimeLimited && (
              <>
                <input
                  type="number"
                  style={{ width: "5vw", marginLeft: "5%" }}
                  value={quiz.timeLimit}
                  min={1}
                  max={240}
                  onChange={(e) =>
                    dispatch(setQuiz({ ...quiz, timeLimit: e.target.value }))
                  }
                />
                Minutes
              </>
            )}
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.multipleAttempts}
              onChange={(e) =>
                dispatch(
                  setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                )
              }
            />
            &nbsp;<span>Multiple Attempts</span>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) =>
                dispatch(
                  setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                )
              }
            />
            &nbsp;<span>One Question At A Time</span>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.webcamRequired}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))
              }
            />
            &nbsp;<span>Web Cam Required</span>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quiz,
                    lockQuestionsAfterAnswering: e.target.checked,
                  })
                )
              }
            />
            &nbsp;<span>Lock Questions After Answering</span>
            <br />
            <br />
            <input
              type="checkbox"
              checked={quiz.showCorrectAnswers}
              onChange={(e) =>
                dispatch(
                  setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
                )
              }
            />
            &nbsp;<span>Show Correct Answers</span>
            {quiz.showCorrectAnswers && (
              <input
                type="date"
                value={formatDate(quiz.correctAnswersDate)}
                className="form-control"
                style={{ width: "50%" }}
                onChange={(e) =>
                  dispatch(
                    setQuiz({ ...quiz, correctAnswersDate: e.target.value })
                  )
                }
              />
            )}
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-3">
            <span className="float-right">Access Code</span>
          </div>
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              style={{ width: "50%" }}
              value={quiz.accessCode}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
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
                    value={formatDate(quiz.dueDate)}
                    className="form-control"
                    min={formatDate(quiz.availableDate)}
                    onChange={(e) => {
                      dispatch(setQuiz({ ...quiz, dueDate: e.target.value }));
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
                      value={formatDate(quiz.availableDate)}
                      className="form-control"
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            availableDate: e.target.value,
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
                      value={formatDate(quiz.untilDate)}
                      min={formatDate(quiz.availableDate)}
                      className="form-control"
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            untilDate: e.target.value,
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
        <div style={{ marginBottom: "10%" }}>
          <button
            onClick={() => handleSave()}
            className="btn  btn-danger ms-2 float-end"
          >
            Save
          </button>
          <Link
            to={`/Kanbas/Courses/${courseId}/Quizzes`}
            className="btn  btn-light ms-2 float-end"
          >
            Cancel
          </Link>
          <button
            onClick={() => {
              dispatch(setQuiz({ ...quiz, isPublished: true }));
              handleSaveAndPublish();
            }}
            className="btn  btn-light ms-2 float-end"
          >
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsEditor;
