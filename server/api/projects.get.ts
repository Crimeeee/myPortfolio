import type { D1Database } from "@cloudflare/workers-types";

const local_projects: Project[] = [
	{
		name: "tougrel.dev",
		author: true,
		author_name: "Tougrel",
		description:
			"A personal portfolio and blog website to share my work. It will become something bigger as time goes on!",
		links: [
			{
				name: "Website",
				icon: "mdi:web",
				to: "https://tougrel.dev",
				active: true,
			},
			{
				name: "Github",
				icon: "mdi:github",
				to: "https://github.com/Tougrel/tougrel.dev",
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
