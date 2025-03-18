import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const profile = await AsyncStorage.getItem("userProfile");
    if (profile) setProfileExists(true);
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("ProfileSetup", { editMode: true })}
      >
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to NoteZoid 2.0</Text>

      <TouchableOpacity
  style={styles.featureButton}
  onPress={async () => {
    const profile = await AsyncStorage.getItem("userProfile");
    const { branch, semester } = JSON.parse(profile);
    navigation.navigate("SubjectScreen", { branch, semester });
  }}
>
  <Text style={styles.buttonText}>📋 Attendance Tracker</Text>
</TouchableOpacity>


      <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("Timetable")}>
        <Text style={styles.buttonText}>📅 Timetable & Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("Events")}>
        <Text style={styles.buttonText}>🎉 Event Updates</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("PastPapers")}>
        <Text style={styles.buttonText}>📚 Past Year Papers</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => navigation.navigate("CampusMap")}>
        <Text style={styles.buttonText}>🗺️ Campus Navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  profileButton: { position: "absolute", top: 40, right: 20 },
  featureButton: { 
    backgroundColor: "#007bff", 
    padding: 12, 
    marginVertical: 8, 
    borderRadius: 8, 
    width: "90%", 
    alignItems: "center" 
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
