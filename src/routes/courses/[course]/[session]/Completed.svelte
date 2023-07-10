<script lang="ts">
	import Button from '$components/Button.svelte';
	import Check from '$icons/Check.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
	import { Routes } from '$lib/routes';
	import { completeSession } from '$api/courses';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { stats } from '$stores/user';
	import type { Course, Session } from '$types';

	export let course: Course;
	export let session: Session;

	let timeMeditated = 0;
	let timeMeditatedUpdated = false;

	function goHome() {
		goto(Routes.HOME);
	}

	function updateTimeMedidated() {
		// These props are going to be updated in the Firestore trigger.
		// However, this might take a couple of seconds, so we update them locally.
		setTimeout(() => {
			timeMeditated += session.audios[0].duration;
			timeMeditatedUpdated = true;
		}, 1_000);
	}

	onMount(() => {
		timeMeditated = $stats.timeMeditated;

		completeSession(session, course);
		updateTimeMedidated();
	});
</script>

<Content>
	<span class="small">Минути</span>

	{#key timeMeditated}
		<span class="count" in:fly|local={{ y: 50, duration: timeMeditatedUpdated ? 1000 : 0 }}>
			{timeMeditated}
		</span>
	{/key}
</Content>

<Footer>
	<Button on:click={goHome}>
		<Check />
		Готово
	</Button>
</Footer>

<style lang="scss">
	.small {
		font-size: 16px;
		text-transform: uppercase;
	}

	.count {
		display: inline-block;
	}
</style>
