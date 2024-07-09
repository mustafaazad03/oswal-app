import apiClient, { API_URL } from "./client";

export const authService = {
	deactivateAccount: async (username) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/auth/deactivate-account/${username}`
			);
			return response.data;
		} catch (error) {
			console.error("Error deactivating account:", error);
			throw error;
		}
	},

	forgetPassword: async (email) => {
		try {
			const response = await apiClient.get(`${API_URL}/auth/forget-password`, {
				params: { email },
			});
			return response.data;
		} catch (error) {
			console.error("Error initiating forget password:", error);
			throw error;
		}
	},

	resetPassword: async (email) => {
		try {
			const response = await apiClient.get(`${API_URL}/auth/reset-password`, {
				params: { email },
			});
			return response.data;
		} catch (error) {
			console.error("Error resetting password:", error);
			throw error;
		}
	},

	changePassword: async (email, password) => {
		try {
			const response = await apiClient.post(`${API_URL}/auth/change-password`, {
				email,
				password,
			});
			return response.data;
		} catch (error) {
			console.error("Error changing password:", error);
			throw error;
		}
	},

	phoneVerification: async (phone) => {
		try {
			const response = await apiClient.get(
				`${API_URL}/auth/phone-verification`,
				{
					params: { phone },
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error verifying phone:", error);
			throw error;
		}
	},

	emailVerification: async (email) => {
		try {
			const response = await apiClient.get(
				`${API_URL}/auth/email-verification`,
				{
					params: { email },
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error verifying email:", error);
			throw error;
		}
	},

	resendOtp: async (email, username) => {
		try {
			const response = await apiClient.post(`${API_URL}/auth/resend-otp`, {
				email,
				username,
			});
			return response.data;
		} catch (error) {
			console.error("Error resending OTP:", error);
			throw error;
		}
	},

	redirect: async (username, email, password) => {
		try {
			const response = await apiClient.post(`${API_URL}/auth/redirect`, {
				username,
				email,
				password,
			});
			return response.data;
		} catch (error) {
			console.error("Error redirecting:", error);
			throw error;
		}
	},
};
