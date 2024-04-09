import { FaBan, FaCheckCircle, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useEffect } from "react";
import { setQuiz} from "../quizzesReducer";

function QuizDetails() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const quizzes = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  function formatDate(inputDate: string): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [year, month, day] = inputDate.split("-").map(Number);
    const formattedDate = `${months[month - 1]} ${day}, ${year}`;
    return formattedDate;
  }
  const dummyQuiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.dummyQuiz
  );

  useEffect(() => {
    if (quizId !== "new") {
      const currentQuiz = quizzes.find(
        (quiz) => quiz._id === quizId
      );
      if (currentQuiz) {
        dispatch(setQuiz(currentQuiz));
      }
    } else {
      dispatch(setQuiz(dummyQuiz));
    }
  }, [quizId, quizzes, dispatch, dummyQuiz]);

 
  return (
    <div style={{ marginRight: 55 }}>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          style={
            !quiz.isPublished
              ? { background: "rgb(2, 128, 2)" }
              : { background: "rgba(200, 19, 19)" }
          }
          className=" btn btn-light"
        >
          {quiz.isPublished ? (
            <FaBan style={{ color: "white" }} className="fas fa-ban" />
          ) : (
            <FaCheckCircle
              style={{ color: "white" }}
              className="fas fa-check-circle"
            />
          )}

          <span style={{ color: "white" }}>
            <b> {quiz.isPublished ? "Unpublish" : "Publish"} </b>
          </span>
        </button>{" "}
        &nbsp;&nbsp;
        <button type="button" className="btn wd-module-button ">
          {" "}
          Preview{" "}
        </button>{" "}
        &nbsp;&nbsp;
        <button type="button" className="btn wd-module-button ">
          {" "}
          <FaPencilAlt
            style={{ color: "grey" }}
            className="fas fa-check-circle button-color"
          />{" "}
          Edit{" "}
        </button>{" "}
        &nbsp;&nbsp;
        <button type="button" className="btn wd-module-button ">
          {" "}
          &nbsp;&nbsp;
          <FaEllipsisV className="fas fa-ellipsis-v black-color" />
        </button>
      </div>

      <hr />
      <div>
        <h2>{quiz.title}</h2>
        <br />
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Quiz Type</strong>
          </div>
          <div className="col-9">{quiz.quizType}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Points</strong>
          </div>
          <div className="col-9">{quiz.points}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Assignment Group</strong>
          </div>
          <div className="col-9">{quiz.assignmentGroup}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Shuffle Answers</strong>
          </div>
          <div className="col-9">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Time Limit</strong>
          </div>
          <div className="col-9">{quiz.timeLimit}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Multiple Attempts</strong>
          </div>
          <div className="col-9">{quiz.multipleAttempts ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Show Correct Answers</strong>
          </div>
          <div className="col-9">{quiz.showCorrectAnswers}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">One Question At A Time</strong>
          </div>
          <div className="col-9">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">Web Cam Required</strong>
          </div>
          <div className="col-9">{quiz.webcamRequired ? "Yes" : "No"}</div>
        </div>
        <div className="row">
          <div className="col-3">
            <strong className="float-right">
              Lock Question After Answering
            </strong>
          </div>
          <div className="col-9">
            {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>
        <br />
        <br />
        <br />

        <table className="table ">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available From</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.dueDate)}</td>
              <td>{quiz.for}</td>
              <td>{formatDate(quiz.availableDate)}</td>
              <td>{formatDate(quiz.untilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuizDetails;
