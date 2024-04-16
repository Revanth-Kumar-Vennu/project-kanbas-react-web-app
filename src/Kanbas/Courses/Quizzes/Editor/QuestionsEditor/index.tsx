import { useNavigate, useParams } from "react-router";
import NavigationTabs from "../Nav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, updateQuiz } from "../../quizzesReducer";
import {
  setQuestions,
  setSelectedQuestion,
  updateQuestion,
} from "../../questionsReducer";
import * as client from "../../client";
import { KanbasState } from "../../../../store";
import {
  FaAngleDown,
  FaBan,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import "./index.css";
import { Editor } from "@tinymce/tinymce-react";
import Popup from "./popup";
import { set } from "date-fns";

function QuestionsEditor() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const selectedQuestion = useSelector(
    (state: KanbasState) => state.questionsReducer.selectedQuestion
  );

  const dummyQuestion = useSelector(
    (state: KanbasState) => state.questionsReducer.dummyQuestion
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const [addQuestionClicked, setAddQuestionClicked] = React.useState(false);
  const [popupTitle, setPopupTitle] = useState("Add Question");
  // const [sele, setSelectedModule] = useState(moduleList[0]);

  const handleEditQuestion = () => {
    client.updateQuestion(selectedQuestion).then((question) => {
      dispatch(setSelectedQuestion(question));
      dispatch(updateQuestion(question));
      setAddQuestionClicked(false);
    });
    // Implement save logic here
  };

  const handleAddQuestion = () => {
    // Implement add logic here
  };
  const handleCancel = () => {
    setAddQuestionClicked(false);
  };

  useEffect(() => {
    client.findQuizByID(quizId).then((quiz) => {
      console.log("quiz", quiz);
      dispatch(setQuiz(quiz));
    });
    client.findQuestionsForQuiz(quizId).then((questions) => {
      console.log("questions", questions);
      dispatch(setQuestions(questions));
    });
  }, [dispatch, quizId, selectedQuestion]);
  return (
    <div>
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
      <hr style={{ marginRight: "5%" }} className="wd-todo-hr" />
      <NavigationTabs />
      <br />
      <br />
      <div style={{ marginRight: "5%" }}>
        <button
          onClick={() => {
            setAddQuestionClicked(true);
            setPopupTitle("Add Question");
            setSelectedQuestion(dummyQuestion);
          }}
          className="btn btn-secondary me-2 wd-module-button "
        >
          <FaPlus style={{ color: "grey" }} className="fas fa-plus-v" /> New
          Question
        </button>
      </div>
      <br />
      {addQuestionClicked && (
        <Popup
          title={popupTitle}
          onSubmit={
            popupTitle === "Add Question"
              ? handleAddQuestion
              : handleEditQuestion
          }
          onCancel={handleCancel}
        />
      )}

      <ul className="list-group wd-modules" style={{ marginRight: "5%" }}>
        {questions.map((question, index) => (
          <li
            className="list-group-item wd-module-item remove-padding"
            onClick={() => setSelectedQuestion(question)}
          >
            <div style={{ height: 50 }} className="align-items-center">
              <div style={{ padding: 10 }}>
                {question.questionTitle}
                <span className="float-end">
                  <FaEdit
                    className=" wd-dots ms-2"
                    onClick={() => {
                      setAddQuestionClicked(true);
                      dispatch(setSelectedQuestion(question));
                      setPopupTitle("Edit Question");
                    }}
                  />
                  <FaTrash
                    className="wd-dots ms-2"
                    // onClick={() => handleDeleteQuestion(module?._id)}
                  />
                </span>
                <br />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default QuestionsEditor;
