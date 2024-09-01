import { createSlice } from "@reduxjs/toolkit";

export interface Admin {
  id: number | string;
  email: string;
}

export interface AdminState {
  value: {
    admin: Admin | null;
    isLoading: boolean;
  };
}

const initialState: AdminState = {
  value: {
    admin: null,
    isLoading: true,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.value.admin = action.payload;
      state.value.isLoading = false;
    },
    clearAdmin: (state) => {
      state.value.admin = null;
      state.value.isLoading = false;
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
