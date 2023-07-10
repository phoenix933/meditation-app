<script lang="ts">
	import Active from './Active.svelte';
	import Backdrop from './Backdrop.svelte';
	import Completed from './Completed.svelte';
	import Header from './Header.svelte';
	import { courses } from '$stores/courses';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { expoInOut, expoIn } from 'svelte/easing';

	let completed = false;

	function onEnd() {
		completed = true;
	}

	$: course = $courses?.find((c) => c.id === $page?.params?.course);
	$: session = course?.sessions?.[+$page?.params?.session - 1];
</script>

<main
	style:background-image="url({course?.thumb})"
	in:fly|local={{ y: 150, duration: 300, easing: expoInOut }}
	out:fly|local={{ y: 350, duration: 400, easing: expoIn }}
>
	<Backdrop />

	<div class="inner">
		<Header />

		{#if completed}
			<Completed {course} {session} />
		{:else}
			<Active {course} {session} on:end={onEnd} />
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		position: relative;
		height: 100vh;
		background-color: var(--background-color-1);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		/* prevents it from appearing below the footer when out animation plays */
		z-index: 1;
	}

	.inner {
		position: absolute;
		top: max(16px, env(safe-area-inset-top));
		bottom: max(16px, env(safe-area-inset-bottom));
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
</style>
