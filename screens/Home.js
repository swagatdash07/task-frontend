import React, { useState, useEffect, useCallback } from "react";
import { View, RefreshControl, FlatList, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Text, Card, Button, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-paper";
import { getAllTasks } from "../env/action";
import { useGetUser } from "../contextApi/UserContext";
import { useFocusEffect } from "@react-navigation/native";
const Home = ({ navigation }) => {
    const { token } = useGetUser();
    const [tasks, setTasks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    useFocusEffect(
        useCallback(() => {
            getTasks();
        }, [getTasks])
    );
    const getTasks = () => {
        setLoading(true);
        getAllTasks(token, (res) => {
            // console.log(res, "==9=9=9=9=9=9=9=9")
            if (res.status == 1) {
                setTasks(res.data);
            } else {
                setTasks([]);
            }
            setLoading(false);
        })
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getTasks();
        setRefreshing(false);
    }, [getTasks]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        navigation.replace("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Tasks</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item._id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={({ item }) => (
                        <Card
                            style={styles.card}
                            onPress={() => navigation.navigate("TaskDetails", { task: item })}
                        >
                            <Card.Content>
                                <Text variant="titleMedium">{item.title}</Text>
                                <Text variant="bodyMedium">{item.description}</Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            )}
            <View>
                <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate("AddTask")} />
            </View>
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
        backgroundColor: "#ffffff",
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        borderWidth: 0.2,
        backgroundColor: "#fff",
    },
    logoutButton: {
        marginTop: 20,
    },
});

export default Home;
