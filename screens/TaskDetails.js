import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { useGetUser } from "../contextApi/UserContext";
import { taskDelete } from "../env/action";
const TaskDetails = ({ navigation, route }) => {
    const { task } = route.params;
    const { token } = useGetUser();
    console.log(task);
    const handleDeleteTask = () => {
        const id = task._id
        taskDelete(token, id, (res) => {
            if (res.status == 1) {
                Alert.alert('Success', 'Task deleted successfully')
                navigation.goBack();
            } else {
                Alert.alert('Failed', 'Failed to delete task')
            }
        })
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title={task.title}
                    right={(props) => (
                        <IconButton
                            {...props}
                            icon="pencil"
                            onPress={() => navigation.navigate("AddTask", { task })}
                        />
                    )}
                />
                <Card.Content>
                    <Text variant="bodyMedium">{task.description}</Text>
                </Card.Content>
            </Card>
            <Button mode="contained" onPress={handleDeleteTask} style={styles.button} buttonColor="red">
                Delete Task
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
    card: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#ffffff",
    },
    button: {
        marginTop: 10,
    },
});

export default TaskDetails;
