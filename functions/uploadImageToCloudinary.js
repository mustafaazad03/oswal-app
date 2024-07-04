import axios from "axios";

export const uploadImageToCloudinary = async (imageFile) => {
	const formData = new FormData();
	formData.append("file", imageFile);
	// console.log(formData);
	const response = await axios.post(
		process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT + "/upload",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	if (response.status !== 201) {
		throw new Error("Failed to upload image");
	}

	return response.data.url;
};
