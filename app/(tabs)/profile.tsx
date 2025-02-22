import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from "expo-jwt";
import { Divider, Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "@/util/AuthContext";


const Profile = () => {
  const [user, setUser] = useState({ name: "", last_name: "", email: "", identification: "" });
  const fadeAnim = useState(new Animated.Value(1))[0];
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { logout } = authContext;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          let current_user = JWT.decode(token, "HOLA@KDJDM4UDNDNI3");
          setUser({
            name: current_user?.name || "Usuario",
            last_name: current_user?.last_name || "No especificado",
            email: current_user?.email || "No disponible",
            identification: current_user?.identification || "No registrada"
          });
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };
    getUserData();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.profileCard]}>
        <Image source={require("../../assets/images/user.png")} style={styles.user_icon} />
        <Text style={styles.userName}>{user.name}</Text>

      </Animated.View>

      <View style={styles.details}>
        <Text style={styles.detailsTitle}>Datos Personales</Text>
        <Divider style={styles.divider} />

        <View style={styles.detailItem}>
          <AntDesign name="user" size={22} color="#007bff" />
          <Text style={styles.detailText}>Nombre: {user.name}</Text>
        </View>

        <View style={styles.detailItem}>
          <AntDesign name="idcard" size={22} color="#007bff" />
          <Text style={styles.detailText}>Apellidos: {user.last_name}</Text>
        </View>

        <View style={styles.detailItem}>
          <AntDesign name="mail" size={22} color="#007bff" />
          <Text style={styles.detailText}>Email: {user.email}</Text>
        </View>

        <View style={styles.detailItem}>
          <AntDesign name="creditcard" size={22} color="#007bff" />
          <Text style={styles.detailText}>Identificación: {user.identification}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
    marginTop: 50
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: "90%",
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: "#007bff",
  },
  user_icon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  details: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
    textAlign: "center",
  },
  divider: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: "#555",
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Profile;
