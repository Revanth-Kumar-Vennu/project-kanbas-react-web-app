import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import questionsReducer from "../Courses/Quizzes/questionsReducer";
import usersReducer from "../Users/userReducer";
export interface KanbasState {
  modulesReducer: {
    dummyModule: any;
    modules: any[];
    module: any;
  };
  usersReducer: {
    role: any
    authenticated: boolean
  };
  assignmentsReducer: {
    dummyAssignment: any;
    assignments: any[];
    assignment: any;
    selectedAssignment: any;
  };
  quizzesReducer: {
    dummyQuiz: any;
    quizzes: any[];
    quiz: any;
    selectedQuiz: any;
  };
  questionsReducer: {
    dummyQuestion: any;
    questions: any[];
    question: any;
    selectedQuestion: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    questionsReducer,
    usersReducer,
  }
});


export default store;