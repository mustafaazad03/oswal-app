import { useQueries } from "@tanstack/react-query";
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
		queryKey: ["user", account],
		queryFn: () => userService.getSingleUser(account),
		enabled: !!account,
		retry: 1,
		staleTime: 5 * 60 * 1000, // 5 minutes
	}));

	const results = useQueries({ queries });

	const isLoading = results.some((result) => result.isLoading);
	const isError = results.some((result) => result.isError);
	const error = results.find((result) => result.error)?.error || null;
	const data = results.map((result) => result.data).filter(Boolean);

	const refetch = () => results.forEach((result) => result.refetch());

	return { data, isLoading, isError, error, refetch };
};

export default useBlockedUserData;
