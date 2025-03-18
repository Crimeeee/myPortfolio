<script lang="ts" setup>
/**
 * @credits Pergel <https://nuxtlabs.com/>
 * @see https://github.com/nuxt/nuxt.com/blob/main/components/OgImage/OgImageDocs.vue
 */
const props = withDefaults(defineProps<{ title?: string; description?: string; headline?: string }>(), {
	title: "title",
	description: "description",
	headline: "headline",
});

const title = computed(() => props.title.slice(0, 60));
</script>

<template>
	<div class="flex h-full w-full flex-col justify-center bg-[#212121]">
		<svg
			class="absolute right-0 top-0"
			width="1200"
			height="675"
			viewBox="0 0 1200 675"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g style="mix-blend-mode: overlay" opacity="0.7" filter="url(#filter0_f_448_25)">
				<circle cx="901.5" cy="45.5" r="199.5" fill="#2563eb" />
				<circle cx="600.5" cy="216.5" r="199.5" fill="#4338ca" />
				<circle cx="179.5" cy="317.5" r="199.5" fill="#f43f5e" />
			</g>
			<defs>
				<filter
					id="filter0_f_448_25"
					x="-240"
					y="-374"
					width="1561"
					height="1111"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_448_25" />
				</filter>
			</defs>
		</svg>

		<div class="w-[600px] pl-[100px]">
			<h1 class="m-0 mb-4 flex w-[600px] items-center text-[75px] font-semibold text-white">
				<span>{{ title }}</span>
			</h1>
			<p class="text-[32px] leading-tight text-[#E4E4E7]">
				{{ description.slice(0, 200) }}
			</p>
		</div>
	</div>
</template>
