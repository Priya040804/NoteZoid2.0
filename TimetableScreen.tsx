import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const TimetableScreen = () => {
  const [timetableImage, setTimetableImage] = useState(null);
  const [classTimes, setClassTimes] = useState([{ subject: "", time: "" }]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Notification permission is needed for reminders.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setTimetableImage(result.assets[0].uri);
    }
  };

  const scheduleNotifications = () => {
    classTimes.forEach(async (cls) => {
      const triggerTime = getNextTriggerDate(cls.time);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Class Reminder: ${cls.subject}`,
          body: `Your class for ${cls.subject} is about to start!`,
        },
        trigger: triggerTime,
      });
    });
    Alert.alert("Success", "Notifications scheduled!");
  };

  const getNextTriggerDate = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const now = new Date();
    const nextClass = new Date();
    nextClass.setHours(hours, minutes, 0, 0);
    if (nextClass <= now) nextClass.setDate(nextClass.getDate() + 1);
    return nextClass;
  };

  const updateClassTime = (index, key, value) => {
    const updated = [...classTimes];
    updated[index][key] = value;
    setClassTimes(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload Timetable & Schedule Reminders</Text>

      {timetableImage && <Image source={{ uri: timetableImage }} style={styles.image} />}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Timetable Image</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Enter Class Subjects & Times</Text>
      {classTimes.map((cls, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={cls.subject}
            onChangeText={(text) => updateClassTime(index, "subject", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={cls.time}
            onChangeText={(text) => updateClassTime(index, "time", text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      <TouchableOpacity onPress={() => setClassTimes([...classTimes, { subject: "", time: "" }])}>
        <Text style={styles.addMore}>+ Add More</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.scheduleButton} onPress={scheduleNotifications}>
        <Text style={styles.scheduleButtonText}>Schedule Notifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  image: { width: "90%", height: 200, resizeMode: "contain", marginBottom: 10 },
  uploadButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginBottom: 15 },
  uploadButtonText: { color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 18, marginBottom: 10 },
  inputRow: { flexDirection: "row", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginHorizontal: 5 },
  addMore: { color: "#007bff", marginBottom: 20 },
  scheduleButton: { backgroundColor: "green", padding: 12, borderRadius: 5 },
  scheduleButtonText: { color: "#fff", fontWeight: "bold" },
});

export default TimetableScreen;
