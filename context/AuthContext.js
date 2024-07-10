import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getToken, setToken } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import JWT from "expo-jwt";
import { userService } from "../api/user";
import { useQuery } from "@tanstack/react-query";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullUser, setFullUser] = useState(null);
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

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.username],
    queryFn: () => userService.getSingleUser(user?.userId),
    enabled: !!user,
    retry: 1,
  });

  useEffect(() => {
    if (userData) {
      setFullUser(userData);
    }
  }, [refetch, userData]);

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
    <AuthContext.Provider value={{ user, login, logout, loading, fullUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
