import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, setToken } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import JWT from "expo-jwt";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const loadToken = async () => {
			try {
				const token = await getToken();
				if (token) {
					const decoded = JWT.decode(token, "kvnJHKUhi7y87syhkj");
					setUser(decoded);
					navigation.reset({
						index: 0,
						routes: [{ name: "Home" }],
					});
				} else {
					setLoading(false);
					navigation.reset({
						index: 0,
						routes: [{ name: "Auth" }],
					});
				}
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		loadToken();
	}, []);

	const login = async (userData, token) => {
		await setToken(token);
		setUser(userData);
		navigation.navigate("Home");
	};

	const logout = async () => {
		await setToken(null);
		setUser(null);
		navigation.navigate("Auth");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
