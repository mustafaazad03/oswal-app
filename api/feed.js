import apiClient, { API_URL } from "./client";

export const postService = {
	getAllFeed: async () => {
		try {
			const response = await apiClient.get(`${API_URL}/post/all`);
			return response.data;
		} catch (error) {
			console.error("Error fetching all posts:", error);
			throw error;
		}
	},

	getSinglePost: async (postId) => {
		try {
			const response = await apiClient.get(`${API_URL}/post/${postId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching single post:", error);
			throw error;
		}
	},

	likePost: async (postId, username) => {
		try {
			const response = await apiClient.put(`${API_URL}/user/like/${username}`, {
				postId,
			});
			return response.data;
		} catch (error) {
			console.error("Error liking post:", error);
			throw error;
		}
	},

	unlikePost: async (postId, username) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/user/unlike/${username}`,
				{
					postId,
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error unliking post:", error);
			throw error;
		}
	},

	createPost: async (postData) => {
		try {
			const response = await apiClient.post(`${API_URL}/post`, postData);
			return response.data;
		} catch (error) {
			console.error("Error creating post:", error);
			throw error;
		}
	},

	updatePost: async (postId, updateData) => {
		try {
			const response = await apiClient.put(
				`${API_URL}/post/${postId}`,
				updateData
			);
			return response.data;
		} catch (error) {
			console.error("Error updating post:", error);
			throw error;
		}
	},

	deletePost: async (postId) => {
		try {
			const response = await apiClient.delete(`${API_URL}/post/${postId}`);
			return response.data;
		} catch (error) {
			console.error("Error deleting post:", error);
			throw error;
		}
	},

	getDeletedPosts: async (userId) => {
		try {
			const response = await apiClient.get(`${API_URL}/post/deleted/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching deleted posts:", error);
			throw error;
		}
	},
};
