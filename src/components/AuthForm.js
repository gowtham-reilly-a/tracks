import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Input } from "react-native-elements";

import { useNavigation } from "@react-navigation/core";

import Spacer from "./Spacer";

export default function AuthForm({
  headerText,
  onFormSubmit,
  errorMessage,
  buttonSubmitText,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
      setPassword("");
    });

    return unsubscribe;
  }, []);

  return (
    <React.Fragment>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Spacer />

      <Input
        placeholder="Type email here..."
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Type password here..."
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {(errorMessage || null) && (
        <Spacer>
          <Text style={styles.error}>{errorMessage}</Text>
        </Spacer>
      )}
      <Spacer>
        <Button
          title={buttonSubmitText}
          onPress={() => onFormSubmit({ email, password })}
        />
      </Spacer>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
