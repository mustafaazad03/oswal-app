import axios from "axios";
import { API_URL } from "../api/client";

export const uploadImageToCloudinary = async (imageFile) => {
	const formData = new FormData();
	formData.append("file", {
		uri: imageFile.uri,
		type: imageFile.mimeType,
		name: imageFile.fileName,
	});
	// console.log(formData);
	const response = await axios.post(`${API_URL}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	if (response.status !== 201) {
		throw new Error("Failed to upload image");
	}

	return response.data.url;
};
