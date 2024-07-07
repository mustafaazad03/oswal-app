import apiClient, { API_URL } from "./client";

export const userService = {
	getAllUsers: async () => {
		try {
			const response = await apiClient.get(`${API_URL}/user`);
			return response.data;
		} catch (error) {
			console.error("Error fetching all users:", error);
			throw error;
		}
	},

	getSingleUser: async (userId) => {
		try {
			const response = await apiClient.get(`${API_URL}/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching single user:", error);
			throw error;
		}
	},

	deleteUser: async (userId) => {
		try {
			const response = await apiClient.delete(`${API_URL}/auth/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error deleting user:", error);
			throw error;
		}
	},

	removePostFromUser: async (username, postId) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/user/removePost/${username}`,
				{ postId }
			);
			return response.data;
		} catch (error) {
			console.error("Error removing post from user:", error);
			throw error;
		}
	},

	getSavedPosts: async (username) => {
		try {
			const response = await apiClient.get(`${API_URL}/user/saved/${username}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching saved posts:", error);
			throw error;
		}
	},

	getAllRating: async (userId) => {
		try {
			const response = await apiClient.get(`${API_URL}/user/${userId}/ratings`);
			return response.data;
		} catch (error) {
			console.error("Error fetching ratings:", error);
			throw error;
		}
	},

	createRating: async (userId, ratingData) => {
		try {
			const response = await apiClient.post(
				`${API_URL}/user/${userId}/ratings`,
				ratingData
			);
			return response.data;
		} catch (error) {
			console.error("Error creating rating:", error);
			throw error;
		}
	},

	updateRating: async (userId, ratingData) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/user/${userId}/ratings`,
				ratingData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating rating:", error);
			throw error;
		}
	},

	deleteRating: async (userId, reviewerId) => {
		try {
			const response = await apiClient.delete(
				`${API_URL}/user/${userId}/ratings`,
				{ data: { reviewerId } }
			);
			return response.data;
		} catch (error) {
			console.error("Error deleting rating:", error);
			throw error;
		}
	},

	followUser: async (userId, followerId) => {
		try {
			const response = await apiClient.post(
				`${API_URL}/user/${userId}/follow`,
				{ followerId }
			);
			return response.data;
		} catch (error) {
			console.error("Error following user:", error);
			throw error;
		}
	},

	unfollowUser: async (userId, unfollowUserId) => {
		try {
			const response = await apiClient.post(
				`${API_URL}/user/${userId}/unfollow`,
				{ unfollowUserId }
			);
			return response.data;
		} catch (error) {
			console.error("Error unfollowing user:", error);
			throw error;
		}
	},

	updateUser: async (userId, updateData) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/user/${userId}`,
				updateData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating user:", error);
			throw error;
		}
	},

	deleteAlbum: async (albumId) => {
		try {
			const response = await apiClient.delete(
				`${API_URL}/user/album/${albumId}`,
				{ data: { albumId } }
			);
			return response.data;
		} catch (error) {
			console.error("Error deleting album:", error);
			throw error;
		}
	},
};
