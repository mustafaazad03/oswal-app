import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user";
const useBlockedUserData = (blockedAccounts) => {
	const queries = blockedAccounts.map((account) => ({
		queryKey: ["user", account.id],
		queryFn: () => userService.getSingleUser(account.id),
		enabled: !!account,
		retry: 1,
	}));

	const results = useQuery(queries);

	const isLoading = results.some((result) => result.isLoading);
	const isError = results.some((result) => result.isError);
	const error = results.find((result) => result.isError)?.error;

	const data = results.map((result) => result.data).filter(Boolean);

	return { data, isLoading, isError, error };
};

export default useBlockedUserData;
