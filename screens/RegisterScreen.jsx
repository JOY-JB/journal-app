import auth from "@react-native-firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterPress = async () => {
    if (email && password) {
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        console.log(userCredential);
      } catch (error) {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          return Alert.alert("This email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          return Alert.alert("This email address is invalid!");
        }

        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Email and Password are required");
    }
  };

  const onPressLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleRegisterPress}
        style={styles.registerBtn}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressLogin} style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "#001524",
            textAlign: "center",
          }}
        >
          Already Registered ? Login Here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#001524",
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  registerBtn: {
    backgroundColor: "#ff7d00",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
