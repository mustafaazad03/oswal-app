export const blockedAccounts = Array(9)
	.fill()
	.map((_, index) => ({
		id: index.toString(),
		name: "Alias Grace",
		username: "alias_grace21",
		avatarUrl: require("../assets/random2.png"),
	}));
