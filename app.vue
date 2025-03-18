<script setup lang="ts">
const { data: user } = await useFetch("/api/user");
const { data: projects } = await useFetch("/api/projects");

useServerHead({
	title: "Gateway",
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/favicon.png",
		},
	],
});

useHead({
	titleTemplate: "%siteName",
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/favicon.png",
		},
	],
});

defineOgImage({
	component: "Pergel",
});
</script>

<template>
	<NuxtLoadingIndicator />
	<div class="gradient absolute inset-x-0 h-32" />
	<StructuresFlex is="main" column items="center" gap="8" class="z-10 h-screen p-4 lg:p-8 2xl:p-16">
		<StructuresFlex row justify="between" gap="4" class="w-full max-w-screen-md p-6">
			<StructuresFlex column items="center" gap="2">
				<UAvatar :src="user.avatar_url" :alt="user.name" size="6xl" />
				<h1 class="text-3xl font-bold">{{ user.name }}</h1>
			</StructuresFlex>
			<StructuresFlex column items="end" gap="2" class="relative">
				<StructuresFlex
					router
					:to="social.to"
					external
					row
					items="center"
					gap="2"
					v-for="social in user.social"
					class="transition-colors"
					:class="social.colors.hover"
				>
					<p>{{ social.value }}</p>
					<Icon :name="social.icon" size="2em" :class="social.colors.base" />
				</StructuresFlex>
			</StructuresFlex>
		</StructuresFlex>

		<StructuresFlex column gap="6" class="w-full max-w-screen-md overflow-y-auto p-6">
			<Project
				v-for="project in projects"
				:name="project.name"
				:description="project.description"
				:author="project.author"
			>
				<UTooltip v-for="link in project.links" :text="link.name">
					<ULink :to="link.to" external="" :aria-label="link.name">
						<Icon :name="link.icon" size="2em" class="hover:text-primary-500 transition-colors" />
					</ULink>
				</UTooltip>
			</Project>
		</StructuresFlex>
	</StructuresFlex>
</template>

<style lang="scss">
* {
	min-width: 0;
}

body {
	@apply relative overflow-y-auto bg-gray-950 font-poppins text-white;
}

.gradient {
	background: linear-gradient(
		152.92deg,
		rgba(var(--color-primary-500) / 0.2) 4.54%,
		rgba(var(--color-primary-600) / 0.26) 34.2%,
		rgba(var(--color-primary-700) / 0.1) 77.55%
	);
	filter: blur(118px);
}
</style>
