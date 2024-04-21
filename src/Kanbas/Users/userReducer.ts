import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // currentUser: {_id: "",
    // username: "",
    // password: "",
    // firstName: "",
    // lastName: "",
    role: "",
    authenticated: false
    // },
  }

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
         setUser: (state, action) => {
        state.role = action.payload;
      },
      setUserAuth: (state, action) => {
        state.authenticated = action.payload;
      },

      
    },
  });
  
  export const { setUser, setUserAuth } = usersSlice.actions;
  export default usersSlice.reducer;
  
