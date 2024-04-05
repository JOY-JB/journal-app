import auth from "@react-native-firebase/auth";
import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
}
