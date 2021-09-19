import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

import Spacer from "./Spacer";

export default function Link({ linkText, routeName, params }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName, params || {})}
    >
      <Spacer>
        <Text style={{ color: "blue" }}>{linkText}</Text>
      </Spacer>
    </TouchableOpacity>
  );
}
