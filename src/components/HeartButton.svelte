<script lang="ts">
	import Heart from '$icons/Heart.svelte';
	import HeartSolid from '$icons/HeartSolid.svelte';
	import { impactMedium } from '$lib/haptics';
	import { toggleCourseFavorite } from '$api/courses';
	import { user } from '$stores/user';

	export let courseId: string;

	function toggleFavorite() {
		isFavorite = !isFavorite;

		toggleCourseFavorite(courseId, isFavorite);

		if (isFavorite) {
			impactMedium();
		}
	}

	$: isFavorite = $user?.courses?.[courseId]?.isSaved;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span role="button" class:solid={isFavorite} on:click|stopPropagation={toggleFavorite}>
	{#if isFavorite}
		<HeartSolid />
	{:else}
		<Heart />
	{/if}
</span>

<style lang="scss">
	span {
		height: 24px;
		width: 24px;
		display: inline-block;

		transition: all 0.15s ease-in-out;

		:global(svg) {
			filter: drop-shadow(0px 0px 4px rgb(255 255 255 / 0.4));
		}

		&.solid {
			color: var(--like-color);

			:global(svg) {
				filter: none;
			}
		}

		&:active {
			transform: scale(0.8);
		}
	}
</style>
