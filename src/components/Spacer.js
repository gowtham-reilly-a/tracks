import React from "react";
import { View } from "react-native";

export default function Spacer({ children }) {
  return <View style={{ margin: 15 }}>{children}</View>;
}
