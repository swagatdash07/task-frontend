// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AddTask from "./screens/AddTask";
import TaskDetails from "./screens/TaskDetails";
import { UserContext } from "./contextApi/UserContext";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
        </Stack.Navigator>
      </UserContext>
    </NavigationContainer>
  );
}
