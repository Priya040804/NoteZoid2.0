import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfileSetup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isEditMode = route.params?.editMode || false;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("1");

  const [branchOpen, setBranchOpen] = useState(false);
  const [semesterOpen, setSemesterOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) loadProfile();
  }, []);

  const loadProfile = async () => {
    const profile = await AsyncStorage.getItem("userProfile");
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setName(parsedProfile.name);
      setEmail(parsedProfile.email);
      setBranch(parsedProfile.branch);
      setSemester(parsedProfile.semester);
    }
  };

  const saveProfile = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const profileData = { name, email, branch, semester };
    await AsyncStorage.setItem("userProfile", JSON.stringify(profileData));

    Alert.alert("Success", "Profile saved successfully!", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditMode ? "Edit Profile" : "Create Profile"}</Text>

      {/* Name Input */}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />

      {/* Email Input */}
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

      {/* Branch Dropdown */}
      <View style={[styles.dropdownWrapper, { zIndex: branchOpen ? 2 : 1 }]}>
        <Text>Select Branch:</Text>
        <DropDownPicker
          open={branchOpen}
          setOpen={setBranchOpen}
          value={branch}
          setValue={setBranch}
          items={[
            { label: "CSE", value: "CSE" },
            { label: "EE", value: "EE" },
            { label: "ECE", value: "ECE" },
            { label: "ME", value: "ME" },
            { label: "CE", value: "CE" },
            { label: "AIDS", value: "AIDS" },
            { label: "VLSI", value: "VLSI" },
          ]}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          onOpen={() => setSemesterOpen(false)} 
        />
      </View>

      {/* Semester Dropdown */}
      <View style={[styles.dropdownWrapper, { zIndex: semesterOpen ? 2 : 1 }]}>
        <Text>Select Semester:</Text>
        <DropDownPicker
          open={semesterOpen}
          setOpen={setSemesterOpen}
          value={semester}
          setValue={setSemester}
          items={Array.from({ length: 8 }, (_, i) => ({
            label: `Semester ${i + 1}`,
            value: (i + 1).toString(),
          }))}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          onOpen={() => setBranchOpen(false)} // Close branch dropdown when opening semester
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>{isEditMode ? "Save Changes" : "Save Profile"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "90%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  saveButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, width: "90%", alignItems: "center" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  dropdownWrapper: { width: "90%", marginBottom: 10 },
  dropdownContainer: { width: "100%" },
  dropdown: { backgroundColor: "#fafafa", borderWidth: 1, borderColor: "#ccc" },
  dropdownList: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" },
});

export default ProfileSetup;
