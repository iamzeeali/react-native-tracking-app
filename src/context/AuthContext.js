import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import * as RootNavigation from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload
      };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload
      };
    case "clear_error_message":
      return {
        ...state,
        errorMessage: ""
      };
    case "signout":
      return {
        token: null,
        errorMessage: ""
      };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    RootNavigation.navigate("Tab");
  } else {
    RootNavigation.navigate("Signup");
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    console.log(email, password);
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    RootNavigation.navigate("Tab");
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    RootNavigation.navigate("Tab");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }
};
const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  RootNavigation.navigate("Signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
