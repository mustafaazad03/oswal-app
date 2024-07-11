import apiClient, { API_URL } from "./client";

export const enquiryService = {
	getAllEnquiries: async () => {
		try {
			const response = await apiClient.get(`${API_URL}/enquiry/all`);
			return response.data;
		} catch (error) {
			console.error("Error fetching all enquiries:", error);
			throw error;
		}
	},

	getSingleEnquiry: async (enquiryId) => {
		try {
			const response = await apiClient.get(`${API_URL}/enquiry/${enquiryId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching single enquiry:", error);
			throw error;
		}
	},

	createEnquiry: async (enquiryData) => {
		try {
			const response = await apiClient.post(`${API_URL}/enquiry`, enquiryData);
			return response.data;
		} catch (error) {
			console.error("Error creating enquiry:", error);
			throw error;
		}
	},

	updateEnquiry: async (enquiryId, updateData) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/enquiry/${enquiryId}`,
				updateData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating enquiry:", error);
			throw error;
		}
	},

	deleteEnquiry: async (enquiryId) => {
		try {
			const response = await apiClient.delete(
				`${API_URL}/enquiry/${enquiryId}`
			);
			return response.data;
		} catch (error) {
			console.error("Error deleting enquiry:", error);
			throw error;
		}
	},

	getEnquiryForUser: async (userId) => {
		try {
			const response = await apiClient.get(`${API_URL}/enquiry/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching user enquiries:", error);
			throw error;
		}
	},
};
