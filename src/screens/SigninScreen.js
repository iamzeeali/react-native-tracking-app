import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     clearErrorMessage();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        navigation={navigation}
        text="Dont' have an account? Sign up instead"
        routeName="Signup"
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

export default SigninScreen;
