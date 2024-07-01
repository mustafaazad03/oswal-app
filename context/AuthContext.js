import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, setToken } from "../api/auth";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		const loadToken = async () => {
			const token = await getToken();
			if (token) {
				// TODO: Fetch user data using the token
				setUser({});
			}
			setLoading(false);
			navigation.navigate("Auth");
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
