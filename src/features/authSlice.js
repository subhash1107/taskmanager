import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUserService } from "../services/AuthService";

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const { data: responseData } = await loginUser(data);
    const { token, user } = responseData || {};

    if (!token) {
      return thunkAPI.rejectWithValue({ message: "No token received" });
    }

    localStorage.setItem("token", token);
    return user || null;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data || { message: "Login failed" }
    );
  }
});


export const registerUser = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const { data: responseData } = await registerUserService(data);
      const { user, token } = responseData || {};

      if (!token) {
        return thunkAPI.rejectWithValue({ message: "No token received" });
      }

      localStorage.setItem("token", token);
      return user || null;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
