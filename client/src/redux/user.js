import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    emailId: null,
    isValid: false,
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.emailId = action.payload.emailId;
      state.isValid = action.payload.isValid;
      state.userId = action.payload.userId;
    },
    signOut: (state) => {
      state.userName = null;
      state.emailId = null;
      state.isValid = false;
      state.userId = null;
    },
  },
});

export const { login, signOut } = userSlice.actions;

export default userSlice.reducer;
