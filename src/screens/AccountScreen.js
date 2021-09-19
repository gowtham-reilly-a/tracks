import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";

import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Spacer>
        <Text h3>Account</Text>
      </Spacer>
      <Spacer>
        <Button title="Sign out" onPress={signOut} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
