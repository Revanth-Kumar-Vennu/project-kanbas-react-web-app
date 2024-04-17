import { useNavigate, useParams } from "react-router";
import NavigationTabs from "../Nav";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, updateQuiz } from "../../quizzesReducer";
import {
  addQuestion,
  setQuestions,
  setSelectedQuestion,
  updateQuestion,
} from "../../questionsReducer";
import * as client from "../../client";
import { KanbasState } from "../../../../store";
import {
  FaBan,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import "./index.css";
import Popup from "./popup";

function QuestionsEditor() {
  const { quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const questions = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
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
  // const [points, setPoints] = useState(0);

  const updateQuizAndQuestions = async (isPublished = false) => {
    let questionIds = questions.map((question) => question._id);
    let totalPoints = 0;
  
    questions.forEach((question) => {
      totalPoints += parseInt(question.points);
    });
  
    const shouldPublish = isPublished || quiz.isPublished;
  
    await client.updateQuiz({
      ...quiz,
      isPublished: shouldPublish,
      questions: questionIds,
      points: totalPoints,
    }).then(() => {
      dispatch(updateQuiz({
        ...quiz,
        isPublished: shouldPublish,
        questions: questionIds,
        points: totalPoints,
      }));
    });
  
    for (let i = 0; i < questions.length; i++) {
      await client.updateQuestion(questions[i]);
    }
  };
  
  
  const handleSave = async () => {
    await updateQuizAndQuestions();
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };
  
  const handleSaveAndPublish = async () => {
    await updateQuizAndQuestions(true);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };
  

  const handleCancelEdit = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleCancel = () => {
    setAddQuestionClicked(false);
    dispatch(setSelectedQuestion(dummyQuestion));
  };

  const handleAddQuestion = () => {
    client.createQuestion(quizId, selectedQuestion).then((question) => {
      dispatch(addQuestion(question));
    });

    setAddQuestionClicked(false);
    dispatch(setSelectedQuestion(dummyQuestion));
  };

  const handleEditQuestion = () => {
    dispatch(updateQuestion(selectedQuestion));
    let updatedQuestions = questions.map((question) => {
      if (question._id === selectedQuestion._id) {
        return selectedQuestion;
      } else {
        return question;
      }
    });

    dispatch(setQuestions(updatedQuestions));
    setAddQuestionClicked(false);
  };

  const handleDeleteQuestion = (questionId: any) => {
    dispatch(
      setQuestions(questions.filter((question) => question._id !== questionId))
    );
  };
 
  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const fetchedQuiz = await client.findQuizByID(quizId);
        dispatch(setQuiz(fetchedQuiz));

        const fetchedQuestions = await Promise.all(
          fetchedQuiz.questions.map((questionId: any) =>
            client.findQuestionByID(questionId)
          )
        );
        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching quiz and questions:", error);
      }
    };
    fetchQuizAndQuestions();
  }, [dispatch, quizId]);

  return (
    <div>
      <div
        className="d-flex justify-content-end "
        style={{ marginRight: "5%" }}
      >
        <strong>Points </strong>&nbsp;{quiz.points} &nbsp;&nbsp;&nbsp;
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
          onSubmit={() => {
            popupTitle === "Add Question"
              ? handleAddQuestion()
              : handleEditQuestion();
          }}
          onCancel={handleCancel}
        />
      )}

      <ul className="list-group wd-modules" style={{ marginRight: "5%" }}>
        {questions?.map((question, index) => (
          <li
            className="list-group-item wd-module-item remove-padding"
            onClick={() => setSelectedQuestion(question)}
          >
            <div style={{ height: 50 }} className="align-items-center">
              <div style={{ padding: 10 }}>
                {question.questionTitle}
                &nbsp;&nbsp;&nbsp;
                <span className="badge badge-pill badge-success" style={{color:'black', backgroundColor:'#d5d5d5'}}>{question.questionType}</span>
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
                    onClick={() => handleDeleteQuestion(question._id)}
                  />
                </span>
                <br />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <hr style={{ marginRight: "5%" }} className="wd-todo-hr" />
      <div style={{ marginBottom: "10%", marginRight: "5%" }}>
        <button
          onClick={() => handleSave()}
          className="btn  btn-danger ms-2 float-end"
        >
          Save
        </button>
        <button
          className="btn  btn-light ms-2 float-end"
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
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
  );
}
export default QuestionsEditor;
