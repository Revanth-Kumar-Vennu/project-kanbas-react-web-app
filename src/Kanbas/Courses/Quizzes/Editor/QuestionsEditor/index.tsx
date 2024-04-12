import { useNavigate, useParams } from "react-router";
import NavigationTabs from "../Nav";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, updateQuiz } from "../../quizzesReducer";
import * as client from "../../client";
import { KanbasState } from "../../../../store";


function QuestionsEditor() {
  const { quizId } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate();
const { courseId } = useParams();
const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

useEffect(() => {

    client.findQuizByID(quizId).then((quiz) => {
      console.log("quiz", quiz);
      dispatch(setQuiz(quiz));
    });
  
}, [dispatch, quizId]);
  return (
    <div>
      <div className="d-flex">
        <strong>Points</strong>{quiz.points}


      </div>
      <NavigationTabs />
      Questions Editor
    </div>
  );
}
export default QuestionsEditor;
