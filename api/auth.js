import apiClient from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (credentials) => {
	const response = await apiClient.post("/auth/login", credentials, {
		withCredentials: true,
	});
	return response.data;
};

export const signup = async (userData) => {
	const response = await apiClient.post("/auth/signup", userData, {
		withCredentials: true,
	});
	return response.data;
};

export const logout = async () => {
	await AsyncStorage.removeItem("auth");
};

export const setToken = async (token) => {
	await AsyncStorage.setItem("auth", token);
};

export const getToken = async () => {
	return await AsyncStorage.getItem("auth");
};
