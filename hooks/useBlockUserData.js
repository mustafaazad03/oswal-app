import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user";
const useBlockedUserData = (blockedAccounts) => {
	if (
		!blockedAccounts ||
		!Array.isArray(blockedAccounts) ||
		blockedAccounts.length === 0
	) {
		return { data: [], isLoading: false, isError: false, error: null };
	}

	const queries = blockedAccounts.map((account) => ({
		queryKey: ["user", account.id],
		queryFn: () => userService.getSingleUser(account.id),
		enabled: !!account,
		retry: 1,
	}));

	const {
		data: results,
		isLoading,
		isError,
		refetch,
		error,
	} = useQuery({ queries });

	if (!Array.isArray(results)) {
		console.error("useQueries did not return an array", results);
		return { data: [], isLoading: false, isError: false, error: null };
	}
	const data = results.map((result) => result.data).filter(Boolean);

	return { data, isLoading, isError, error, refetch };
};

export default useBlockedUserData;
