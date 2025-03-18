import pkg from "~/package.json";

export default defineEventHandler(() => {
	return {
		name: pkg.name,
		version: pkg.version,
	};
});
