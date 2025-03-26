import type { D1Database } from "@cloudflare/workers-types";

const local_projects: Project[] = [
	{
		name: "Leaderboard",
		author: true,
		author_name: "Crime",
		description:
			"I created a custom Leaderboard that provides players with real-time information such as Online Users as well as Server Teams, highlighting the top 3 with a dierent color to make them stand out.",
		links: [
			{
				name: "Github",
				icon: "mdi:github",
				to: "https://github.com/Crimeeee",
				active: true,
			},
		],
	},

	{
		name: "FiveM DiscordBot",
		author: true,
		author_name: "Crime",
		description:
			"I made a Discord Bot, which was purely for a FiveM Discord Server and helped the user with any questions they had, because with one command they could see the Online Players the Server had without entering the game.",
		links: [
			{
				name: "Github",
				icon: "mdi:github",
				to: "https://github.com/Crimeeee/DejaVu",
				active: true,
			},
		],
	},

	{
		name: "Aura",
		author: false,
		author_name: "Tougrel",
		description:
			"Aura is a feature-rich bot including a fun leveling system, an amazing economy system, tools to moderate your server along with a modern dashboard, and many others! All in set with ease of use.",
		links: [
			{
				name: "Website",
				icon: "mdi:web",
				to: "https://auragroup.dev",
				active: true,
			},
			{
				name: "Github",
				icon: "mdi:github",
				to: "https://github.com/AuraDevelopers",
				active: true,
			},
		],
	},

	{
		name: "cfxStatus UnofficialBot",
		author: false,
		author_name: "vaggos",
		description:
			"cfxStatus is a DiscordBot that every user can have in their personal Discord Server to see when the FiveM Servers are Down and when they are UP.",
		links: [
			{
				name: "Discord",
				icon: "mdi:discord",
				to: "https://discord.gg/xq5TXy3vfc",
				active: true,
			},
		],
	},
];

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const context = event.context;
	const isCloudflare = "cloudflare" in context;

	let results;
	if (isCloudflare && process.env.USE_CLOUDFLARE_D1 === "true") {
		const database: D1Database = context.cloudflare.env.DATABASE;
		const query = await database
			.prepare("SELECT name, author, author_name, description, json(links) as links FROM Projects")
			.all<Project>();

		query.results.forEach((value) => {
			if (typeof value.links !== "string") return;
			value.links = JSON.parse(value.links);
		});

		results = query.results;
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
		results = local_projects;
	}

	return results;
});

interface Project {
	name: string;
	author: boolean;
	author_name: string;
	description: string;
	links: string | ProjectLinks[];
}

interface ProjectLinks {
	name: string;
	icon: string;
	to: string;
	active: boolean;
}
