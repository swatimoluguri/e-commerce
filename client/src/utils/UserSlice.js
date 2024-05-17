import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = 0;
    },
  },
});

export default UserSlice.reducer;
export const { addUser, clearUser } = UserSlice.actions;
