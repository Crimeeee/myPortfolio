<script setup lang="ts">
defineProps<{ name: string; description: string; author: boolean }>();
</script>

<template>
	<StructuresFlex
		column
		no-shrink
		justify="between"
		class="relative overflow-hidden rounded-lg p-4 shadow-lg shadow-gray-800 ring-2 ring-gray-700"
	>
		<StructuresFlex column gap="2">
			<h2 class="text-2xl font-bold" :class="{ 'text-primary-500': author, 'text-blue-500': !author }">
				{{ name }}
			</h2>
			<p class="text-gray-400">{{ description }}</p>
			<UDivider />
			<StructuresFlex row justify="between" items="center" gap="2">
				<StructuresFlex row items="center" gap="2">
					<slot />
				</StructuresFlex>
				<p class="font-medium italic">{{ author ? "Creator" : "Contributor" }}</p>
			</StructuresFlex>
		</StructuresFlex>
		<div
			class="absolute left-0 top-[50%] h-16 w-16 -translate-y-[50%] blur-3xl"
			:class="{ 'bg-primary-500': author, 'bg-blue-500': !author }"
		/>
	</StructuresFlex>
</template>
