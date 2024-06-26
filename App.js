import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "./screens/CreateAccountScreen";
import LoginScreen from "./screens/LoginScreen";
import AuthScreen from "./screens/AuthScreen";
import ProfileDetailsScreen from "./screens/PersonalDetailScreen";
import FeedScreen from "./screens/FeedScreen";
import BusinessDetailsScreen from "./screens/BuisnessDetailScreen";
import BusinessContactScreen from "./screens/BuisnessContactDetailScreen";
import CreateAlbumScreen from "./screens/CreateAlbumScreen";
import ExploreScreen from "./screens/ExploreScreen";
import SearchScreen from "./screens/SearchScreen";

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
				<Stack.Screen
					name="PersonalDetails"
					component={ProfileDetailsScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				{/* Buisness Details */}
				<Stack.Screen
					name="BusinessDetails"
					component={BusinessDetailsScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				{/* Buisness Contact Details */}
				<Stack.Screen
					name="BusinessContact"
					component={BusinessContactScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				{/* Create Album */}
				<Stack.Screen
					name="CreateAlbum"
					component={CreateAlbumScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				{/* Explore Screen */}
				<Stack.Screen
					name="Explore"
					component={ExploreScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				<Stack.Screen
					name="Home"
					component={FeedScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
				{/* Search Screen */}
				<Stack.Screen
					name="Search"
					component={SearchScreen}
					options={{ headerShown: false, presentation: "fullScreenModal" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
