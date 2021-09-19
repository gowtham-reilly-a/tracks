import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";

import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = ({ navigation }) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in"
        buttonSubmitText="Sign in"
        errorMessage={state.errorMessage}
        onFormSubmit={signIn}
      />
      <NavLink
        linkText="Don't have an account? Click to create"
        routeName="Signup"
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

export default SigninScreen;
