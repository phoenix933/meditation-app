<script lang="ts">
	import BackButton from '$components/BackButton.svelte';
	import type { Course } from '$types';

	export let course: Course;
	export let scrolled = false;
</script>

<header class:scrolled>
	<BackButton />

	<h1>{course?.name}</h1>
</header>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		width: 100%;
		padding: max(8px, env(safe-area-inset-top)) 24px 8px;
		z-index: 1;

		display: flex;
		align-items: center;
		background-color: transparent;
		transition: all 0.15s ease-in;

		h1 {
			font-size: 16px;
			font-weight: 600;
			margin-left: 24px;
			opacity: 0;
		}

		&.scrolled {
			background-color: var(--background-color-1);
			box-shadow: 0px 0px 10px 0px var(--shadow-color-1);

			h1 {
				opacity: 1;
			}
		}
	}
</style>
