import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     clearErrorMessage();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign up for tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        navigation={navigation}
        text="Already have an account? Sign in instead"
        routeName="Signin"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});

export default SignupScreen;
