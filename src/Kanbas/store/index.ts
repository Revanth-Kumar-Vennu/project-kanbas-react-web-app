import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
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
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
  }
});


export default store;