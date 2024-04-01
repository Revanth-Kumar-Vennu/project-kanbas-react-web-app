import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: Array<any>(),
  selectedAssignment: {
    title: "New assignment",
    description: "New Description",
    _id: "new",
    dueDate: "2021-12-31",
    availableFrom: "2021-12-31",
    availableUntil: "2021-12-31",
    points: 100,
  },
  assignment: {
    title: "New assignment",
    description: "New Description",
    _id: "new",
    dueDate: "2021-12-31",
    availableFrom: "2021-12-31",
    availableUntil: "2021-12-31",
    points: 100,
  },
  dummyAssignment: {
    _id: "new",
    title: "New assignment",
    description: "New Description",
    dueDate: "2021-12-31",
    availableFrom: "2021-12-31",
    availableUntil: "2021-12-31",
    points: 100,
  },
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [
        {
          ...state.assignments,
          ...action.payload,
          _id: new Date().getTime().toString(),
        },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setSelectedAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setSelectedAssignment,
  setAssignments,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
