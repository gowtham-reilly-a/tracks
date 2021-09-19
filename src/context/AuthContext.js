import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

import { navigate } from "../NavigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorMessage: "" };
    case "AUTH":
      return { ...state, errorMessage: "", token: action.payload };
    case "SIGN_OUT":
      return { ...state, errorMessage: "", token: null };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => dispatch({ type: "CLEAR_ERROR" });

const checkLocalAuthToken = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token)
    return navigate("AuthFlow", {
      screen: "Signup",
    });

  dispatch({ type: "AUTH", payload: token });
  navigate("MainFlow");
};

const signUp = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.data.token);
      dispatch({ type: "AUTH", payload: response.data.data.token });
      navigate("MainFlow", {
        screen: "TrackList",
      });
    } catch (err) {
      dispatch({ type: "ADD_ERROR", payload: err.response.data.message });
    }
  };
};

const signIn = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.data.token);
      dispatch({ type: "AUTH", payload: response.data.data.token });

      navigate("MainFlow", {
        screen: "TrackList",
      });
    } catch (err) {
      dispatch({
        type: "ADD_ERROR",
        payload: err.response.data.message,
      });
    }
  };
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
  navigate("AuthFlow", {
    screen: "Signin",
  });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearErrorMessage, checkLocalAuthToken },
  { token: null, errorMessage: "" }
);
