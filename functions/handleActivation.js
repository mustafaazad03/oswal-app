import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { notify } from "./Toast";

export const handleActivation = async (
	password,
	setIsDeactivated,
	setChildModal
) => {
	const token = Cookies.get("auth");

	if (!token) {
		return;
	}

	const decodeJwt = jwt.decode(token);
	const username = decodeJwt.username;

	try {
		const res = await axios.put(
			`${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/auth/activate-account/${username}`,
			{
				password: password,
			}
		);

		if (res.status === 200) {
			notify("Account activated successfully", "success");
			setIsDeactivated(false);
			setChildModal(false);
		}
	} catch (error) {
		notify("An error occurred, please try again", "error");
	}
};
