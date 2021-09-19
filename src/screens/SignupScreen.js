import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Create new account"
        buttonSubmitText="Create account"
        errorMessage={state.errorMessage}
        onFormSubmit={signUp}
      />
      <NavLink
        linkText="Already have an account? Click to Sign in"
        routeName="Signin"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 15,
  },
});

export default SignupScreen;
