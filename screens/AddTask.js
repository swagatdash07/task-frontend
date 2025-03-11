import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { taskCreate, taskUpdate } from "../env/action";
import { useGetUser } from "../contextApi/UserContext";
const AddTask = ({ navigation, route }) => {
    const { token } = useGetUser();
    const task = route?.params?.task || {};
    // console.log(task, "route parameter")
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");

    const handleSaveTask = () => {
        const params = {
            title,
            description,
        }
        const id = task._id
        if (task.title || task.description) {
            taskUpdate(params, token, id, (res) => {
                if (res.status == 1) {
                    Alert.alert('Success', res.message);
                    navigation.navigate("Home");
                } else {
                    Alert.alert('Error', "Failed to update task");
                }
            })
        } else {
            taskCreate(params, token, id, (res) => {
                if (res.status == 1) {
                    Alert.alert('Success', res.message);
                    navigation.navigate("Home");
                } else {
                    Alert.alert('Error', "Failed to create task");
                }
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title ? "Edit" : "Add"} Task</Text>
            <TextInput
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                label="Description"
                mode="outlined"
                value={description}
                onChangeText={setDescription}
                multiline
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSaveTask} style={styles.button}>
                {task.title ? "Update" : "Add"} Task
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        alignSelf: "center",
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
    },
});

export default AddTask;
