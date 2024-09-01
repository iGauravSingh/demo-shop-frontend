import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number | string;
  email: string;
  username: string;
  address: string;
  phoneNumber: string;
}

export interface UserState {
  value: {
    user: User | null;
    isLoading: boolean;
  };
}

const initialState: UserState = {
  value: {
    user: null,
    isLoading: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
      state.value.isLoading = false;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
