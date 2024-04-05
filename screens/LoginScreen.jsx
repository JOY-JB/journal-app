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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    if (email && password) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password
        );

        console.log(userCredential);
      } catch (error) {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          return Alert.alert("This email address is invalid!");
        }
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Email and Password are required");
    }
  };

  const onPressSignUp = () => {
    navigation.navigate("register");
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

      <TouchableOpacity onPress={handleLoginPress} style={styles.loginBtn}>
        <Text style={{ color: "white", fontWeight: "700" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressSignUp} style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "#001524",
            textAlign: "center",
          }}
        >
          New User ? Register Here
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
  loginBtn: {
    backgroundColor: "#ff7d00",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
