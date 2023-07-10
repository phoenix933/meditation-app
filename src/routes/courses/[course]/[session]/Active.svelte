<script lang="ts">
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
	import Player from '$components/Player.svelte';
	import { toMinutes } from '$lib/format';
	import type { Course, Session } from '$types';

	export let course: Course;
	export let session: Session;

	let isPlaying = false;
	let currentTime = 0;
	let duration = 0;

	function onTimeUpdate({ detail }: { detail: { currentTime: number; duration: number } }) {
		({ currentTime, duration } = detail);
	}
</script>

<Content>
	<div class:isPlaying>
		{toMinutes(duration - currentTime)}
	</div>
</Content>

<Footer>
	<div class="course">
		{course?.name ?? '-'}
	</div>
	<div class="session">
		Сесия {session?.order ?? ''}
	</div>

	{#if session}
		<!-- TODO: Use this -->
		<!-- session?.audios?.[0]?.url -->
		<Player
			src={"https://firebasestorage.googleapis.com/v0/b/masterpeace-development.appspot.com/o/demo-meditation.mp3?alt=media&token=3852f448-2944-4610-a0c8-537d074569da"}
			on:change={({ detail }) => (isPlaying = detail)}
			on:timeUpdate={onTimeUpdate}
			on:end
		/>
	{/if}
</Footer>

<style lang="scss">
	.isPlaying {
		font-size: 40px;
	}

	.course {
		font-size: 20px;
		color: white;
		text-transform: capitalize;
		margin-bottom: 8px;
	}

	.session {
		font-size: 14px;
		color: var(--text-color-4);
		margin-bottom: 36px;
	}
</style>
