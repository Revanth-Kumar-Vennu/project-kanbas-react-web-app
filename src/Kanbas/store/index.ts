import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
export interface KanbasState {
  modulesReducer: {
    dummyModule: any;
    modules: any[];
    module: any;
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
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
  }
});


export default store;