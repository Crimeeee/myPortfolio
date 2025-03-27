import type { D1Database } from "@cloudflare/workers-types";

const local_user: User = {
	name: "K.Karafylles",
	avatar_url: "https://cdn.karafylles.me/karafylles.jpg",
	social: [
		{
			icon: "mdi:email",
			value: "me@karafylles.me",
			to: "mailto:me@karafylles.me",
			colors: {
				base: "text-primary-700",
				hover: "hover:text-primary-500",
			},
		},
		{
			icon: "mdi:github",
			value: "Karafylles Konstantinos",
			to: "https://github.com/Crimeeee",
			colors: {
				base: "text-gray-500",
				hover: "hover:text-gray-400",
			},
		},
		{
			icon: "mdi:discord",
			value: "crime.01",
			to: "",
			colors: {
				base: "text-discord",
				hover: "hover:text-discord",
			},
		},
		{
			icon: "mdi:linkedin",
			value: "Konstantinos Karafylles",
			to: "https://www.linkedin.com/in/konstantinos-karafylles-2171b130a/",
			colors: {
				base: "text-twitter",
				hover: "hover:text-twitter",
			},
		},
	],
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const context = event.context;
	const isCloudflare = "cloudflare" in context;

	let results;
	if (isCloudflare && process.env.USE_CLOUDFLARE_D1 === "true") {
		const database: D1Database = context.cloudflare.env.DATABASE;
		const result = await database
			.prepare("SELECT name, avatar_url, json(social) as social FROM User")
			.first<User>();

		if (result && typeof result.social === "string") {
			result.social = JSON.parse(result.social);
		}

		results = result;
	} else if (config.public.usesExternalAPI) {
		if (!config.public.externalAPIAddress) {
			createError({
				name: "Fetching Data",
				cause: "externalAPIAddress is not valid",
				statusCode: 500,
			});
		} else {
			const response = await fetch(config.public.externalAPIAddress?.toString());
			results = await response.json();
		}
	} else {
		results = local_user;
	}

	return results;
});

interface User {
	name: string;
	avatar_url: string;
	social: string | UserSocial[];
}

interface UserSocial {
	icon: string;
	value: string;
	to: string;
	colors: UserSocialColors;
}

interface UserSocialColors {
	base: string;
	hover: string;
}
