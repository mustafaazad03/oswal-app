import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "./screens/CreateAccountScreen";
import LoginScreen from "./screens/LoginScreen";
import AuthScreen from "./screens/AuthScreen";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Auth">
				<Stack.Screen
					name="Auth"
					component={AuthScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				<Stack.Screen
					name="Register"
					component={CreateAccount}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
