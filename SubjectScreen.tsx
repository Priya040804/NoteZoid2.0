
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const subjectData = {
  CSE: {
    "1": ["Maths I", "Physics", "Programming Basics", "Engineering Graphics"],
    "2": ["Maths II", "Chemistry", "Data Structures", "Electrical Science"],
   
  },
  ECE: {
    "1": ["Maths I", "Physics", "Electronics Basics", "Engineering Mechanics"],
    "2": ["Maths II", "Digital Circuits", "Signals & Systems", "EMI"],
   
  },
 
};

const SubjectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { branch, semester } = route.params;

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const subjectsList = subjectData[branch]?.[semester] || [];
    setSubjects(subjectsList);
  }, [branch, semester]);

  const handleSubjectClick = (subject) => {
    navigation.navigate("Calendar", { subject, branch, semester });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects for {branch} - Semester {semester}</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.subjectButton} onPress={() => handleSubjectClick(item)}>
            <Text style={styles.subjectText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subjectButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  subjectText: { color: "#fff", fontSize: 18 },
});

export default SubjectScreen;
