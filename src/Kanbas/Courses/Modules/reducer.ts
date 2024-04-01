import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: Array<any>(),
  module: { name: "New Module", description: "New Description", _id: "0" },
  dummyModule: {
    _id: "0",
    name: "New Module",
    description: "New Description",
  },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    addModule: (state, action) => {
      state.modules = [
        ...state.modules,
        action.payload,
      ]
    },

    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module: { _id: string }) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module: { _id: string }) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
