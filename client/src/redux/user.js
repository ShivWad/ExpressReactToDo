import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    emailId: "",
    isValid: false,
    userId: "",
},
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.emailId = action.payload.emailId;
      state.isValid = action.payload.isValid;
      state.userId =  action.payload.userId;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
