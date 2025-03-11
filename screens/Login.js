import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../env/action";
import { useGetUser } from "../contextApi/UserContext";
const Login = ({ navigation }) => {
    const { user, setUser, setToken } = useGetUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const params = {
            email,
            password
        }
        login(params, async (res) => {
            if (res.status == 1) {
                await AsyncStorage.setItem("token", res.token);
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
                setUser(res.data);
                setToken(res.token);
                Alert.alert('Success', 'Login Successfull')
                navigation.replace("Home");
            } else {
                Alert.alert('Error', 'Login failed please try again')
            }
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                label="Password"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Signup")}>
                Don't have an account? Signup
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

export default Login;
