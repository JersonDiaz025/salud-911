import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import apiRequest from "../util/request"

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identification, setidentification] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const fields = [name, email, lastName, identification, password, confirmPassword];

    if (fields.some(field => field.trim() === "")) {
      return Alert.alert("Debes de proveer todos los datos para continuar...");
    }

    if (password !== confirmPassword) return Alert.alert("Las contraseñas no coinciden..")
    const newUser = {
      name: name,
      last_name: lastName,
      email: email,
      password: password,
      identification: identification,
      confirmPassword: confirmPassword
    };


    const result = await apiRequest(newUser as any, "POST", "/user");
    navigation.replace("Login")
    console.log(result, "this is the result...")
  };

  return (
    <ImageBackground
      source={require("../assets/images/4882066.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crear cuenta</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="drive-file-rename-outline"
                size={24}
                style={styles.icon}
                color="white"
              />
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="drive-file-rename-outline"
                size={24}
                style={styles.icon}
                color="white"
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="white"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <FontAwesome
                style={styles.icon}
                name="id-card"
                size={21}
                color="white"
              />
              <TextInput
                style={styles.input}
                placeholder="Cédula"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={identification}
                onChangeText={setidentification}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="white"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="white"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={confirmPassword}
                onChangeText={setConfirmPassowrd}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.switchText}>
                Ya tienes una cuenta? - Inicar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 40,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "white",
    paddingVertical: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 20,
  },
  switchText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    textShadowColor: "rgba(0,0,0,0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default SignUpScreen;
