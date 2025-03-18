
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from "react-native-calendars";
import { useRoute } from "@react-navigation/native";

const CalendarScreen = () => {
  const route = useRoute();
  const { subject, branch, semester } = route.params;

  const [markedDates, setMarkedDates] = useState({});
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

  const key = `attendance_${branch}_${semester}_${subject}`;

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      setMarkedDates(parsed);
      calculateStats(parsed);
    }
  };

  const markAttendance = (day, status) => {
    const newMarkedDates = {
      ...markedDates,
      [day]: { selected: true, selectedColor: status === "present" ? "green" : "red" },
    };

    setMarkedDates(newMarkedDates);
    calculateStats(newMarkedDates);
    AsyncStorage.setItem(key, JSON.stringify(newMarkedDates));
  };

  const calculateStats = (data) => {
    let present = 0, absent = 0;
    Object.values(data).forEach((item) => {
      if (item.selectedColor === "green") present++;
      else if (item.selectedColor === "red") absent++;
    });
    const total = present + absent;
    setStats({ present, absent, total });
  };

  const handleDayPress = (day) => {
    Alert.alert(
      "Mark Attendance",
      `Mark attendance for ${day.dateString}`,
      [
        { text: "Present", onPress: () => markAttendance(day.dateString, "present") },
        { text: "Absent", onPress: () => markAttendance(day.dateString, "absent") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const attendancePercentage = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(2) : "0";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject} Attendance</Text>

      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Present: {stats.present}</Text>
        <Text style={styles.statsText}>Absent: {stats.absent}</Text>
        <Text style={styles.statsText}>Total Classes: {stats.total}</Text>
        <Text style={styles.statsText}>Attendance %: {attendancePercentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  statsContainer: { marginTop: 20, padding: 10, backgroundColor: "#f5f5f5", borderRadius: 8 },
  statsText: { fontSize: 16, marginBottom: 5 },
});

export default CalendarScreen;
