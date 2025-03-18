import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/NoteZoid2.0.jpeg")} style={styles.logo} />
      <Text style={styles.title}>NoteZoid 2.0</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("ProfileSetup")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight:"heavy", marginBottom: 30 },
  startButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default SplashScreen;
