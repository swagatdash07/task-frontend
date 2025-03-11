import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const GetUserContext = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                const storedUserDetails = await AsyncStorage.getItem('user');

                if (storedToken) {
                    setToken(storedToken);
                }
                if (storedUserDetails) {
                    try {
                        const userData = JSON.parse(storedUserDetails);
                        setUser(userData);
                        if (userData) {
                            navigation.navigate('Home');
                        }
                    } catch (error) {
                        console.error("Error parsing user profile:", error);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data from AsyncStorage:', error);
            }
        };
        initializeUser();
    }, [navigation]); // Re-run effect when navigation changes

    const contextValue = {
        token,
        setToken,
        user,
        setUser,
    };

    return (
        <GetUserContext.Provider value={contextValue}>
            {children}
        </GetUserContext.Provider>
    );
};

export const useGetUser = () => {
    const context = useContext(GetUserContext);
    if (!context) {
        throw new Error('useGetUser must be used within a UserProvider');
    }
    return context;
};
