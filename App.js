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
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ProfileDetailsSettingScreen from "./screens/PersonalDetailSetting";
import BusinessDetailsSettingScreen from "./screens/BuisnessDetailSetting";
import ContactDetailSettingScreen from "./screens/ContactDetailSetting";
import MyAlbumScreen from "./screens/MyAlbumSeting";
import ExploreSettingScreen from "./screens/ExploreSettingScreen";
import NotificationsSettingScreen from "./screens/NotificationSettingScreen";
import EnquiriesScreen from "./screens/EnquiryScreen";
import PasswordSecurityScreen from "./screens/PasswordSecurityScreen";
import AccountPrivacyScreen from "./screens/AccountPrivacy";
import DeletedFeedsScreen from "./screens/DeletedFeedScreen";
import DeactivationDeletionScreen from "./screens/DeactivationDeletionScreen";
import ChangePasswordModal from "./components/ChangePasswordModal";
import EnquirySettingScreen from "./screens/EnquirySettingScreen";
import RaiseEnquiryScreen from "./screens/RaiseEnquiry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import OTPVerification from "./screens/OTPVerification";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BlockedAccountsScreen from "./screens/BlockedAccountsScreen";
import CreateFeedScreen from "./screens/CreateFeedScreen";
import CommonProfileScreen from "./screens/CommonProfileScreen";
import ParticularPostScreen from "./screens/PerticularPostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import SavedPostsScreen from "./screens/SavedPostScreen";

const Stack = createNativeStackNavigator();

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<AuthProvider>
						<Stack.Navigator initialRouteName="Auth">
							<Stack.Screen
								name="Auth"
								component={AuthScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="Register"
								component={CreateAccount}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="Login"
								component={LoginScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="OTPVerification"
								component={OTPVerification}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="PersonalDetails"
								component={ProfileDetailsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Buisness Details */}
							<Stack.Screen
								name="BusinessDetails"
								component={BusinessDetailsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Buisness Contact Details */}
							<Stack.Screen
								name="BusinessContact"
								component={BusinessContactScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Create Album */}
							<Stack.Screen
								name="CreateAlbum"
								component={CreateAlbumScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Explore Screen */}
							<Stack.Screen
								name="Explore"
								component={ExploreScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="Home"
								component={FeedScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Search Screen */}
							<Stack.Screen
								name="Search"
								component={SearchScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Profile Screen */}
							<Stack.Screen
								name="Info"
								component={ProfileScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Setting  screen*/}
							<Stack.Screen
								name="Setting"
								component={SettingsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Edit Profile Screen */}
							<Stack.Screen
								name="EditProfile"
								component={EditProfileScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Personal Detail Setting */}
							<Stack.Screen
								name="PersonalDetailSetting"
								component={ProfileDetailsSettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Buisness Detail Setting Screen */}
							<Stack.Screen
								name="BusinessDetailSetting"
								component={BusinessDetailsSettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Contact Detail Setting */}
							<Stack.Screen
								name="ContactDetailSetting"
								component={ContactDetailSettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* My Album */}
							<Stack.Screen
								name="MyAlbum"
								component={MyAlbumScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Notification Settings Screen */}
							<Stack.Screen
								name="NotificationSetting"
								component={NotificationsSettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Explore Setting Screen */}
							<Stack.Screen
								name="ExploreSetting"
								component={ExploreSettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Enquiries Screen */}
							<Stack.Screen
								name="EnquiriesSetting"
								component={EnquiriesScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Password Security Screen */}
							<Stack.Screen
								name="PasswordSecurity"
								component={PasswordSecurityScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Account Privacy Screen */}
							<Stack.Screen
								name="AccountPrivacy"
								component={AccountPrivacyScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Deleted Feed Screen */}
							<Stack.Screen
								name="DeletedFeed"
								component={DeletedFeedsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Deactivation and Deletion Screen */}
							<Stack.Screen
								name="DeactivationDeletion"
								component={DeactivationDeletionScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Enquiry Setting Screen */}
							<Stack.Screen
								name="EnquirySetting"
								component={EnquirySettingScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Change Password Modal */}
							<Stack.Screen
								name="ChangePassword"
								component={ChangePasswordModal}
								options={{ headerShown: false, presentation: "modal" }}
							/>
							{/* Raise Enquiry */}
							<Stack.Screen
								name="RaiseEnquiry"
								component={RaiseEnquiryScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* UploadPdf screen */}
							<Stack.Screen
								name="UploadPDF"
								component={RaiseEnquiryScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* BlockedAccountsScreen */}
							<Stack.Screen
								name="BlockedAccounts"
								component={BlockedAccountsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							{/* Create feed screen */}
							<Stack.Screen
								name="CreateFeed"
								component={CreateFeedScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="CommonProfile"
								component={CommonProfileScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="ParticularPost"
								component={ParticularPostScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="NotificationUser"
								component={NotificationScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="ForgotPassword"
								component={ForgetPasswordScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name="SavedPost"
								component={SavedPostsScreen}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
						</Stack.Navigator>
					</AuthProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

export default App;
