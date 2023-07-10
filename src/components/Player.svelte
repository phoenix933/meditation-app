<script lang="ts">
	import Pause from '$icons/Pause.svelte';
	import Play from '$icons/Play.svelte';
	import Range from './Range.svelte';
	import Spinner from '$components/Spinner.svelte';
	import { createEventDispatcher } from 'svelte';
	import { toMinutes } from '$lib/format';
	import { impactMedium } from '$lib/haptics';

	export let src: string;

	let currentTime: number;
	let duration: number;

	const dispatch = createEventDispatcher();

	let isPlaying = false;
	let isLoading = false;
	let player: HTMLAudioElement;

	async function togglePlay() {
		player.paused ? player.play() : player.pause();

		dispatch('change', isPlaying);

		await impactMedium();
	}

	function seek(time: number) {
		player.currentTime = time;
	}

	// Events
	function onLoadStart() {
		isLoading = true;
	}

	function onLoadedData() {
		isLoading = false;

		currentTime = Math.floor(player.currentTime);
		duration = Math.floor(player.duration);
	}

	function onPlay() {
		isPlaying = true;
	}

	function onPause() {
		isPlaying = false;
	}

	function onSeeking() {
		isLoading = true;
	}

	function onSeeked() {
		isLoading = false;
	}

	function onTimeUpdate() {
		// Update the duration because, for some reason, it changes in the last 5 seconds.
		currentTime = Math.floor(player.currentTime);
		duration = Math.floor(player.duration);

		dispatch('timeUpdate', { currentTime, duration });

		// >= in case the duration bug occurrs and currentTime is actually > duration
		if (currentTime >= duration) {
			// this.ended.emit();
		}
	}

	function onEnded() {
		if (player.currentTime >= player.duration) {
			dispatch('end');
		}
	}
</script>

<div class="player">
	<audio
		autoplay
		{src}
		bind:this={player}
		on:loadstart={onLoadStart}
		on:loadeddata={onLoadedData}
		on:play={onPlay}
		on:pause={onPause}
		on:seeking={onSeeking}
		on:seeked={onSeeked}
		on:timeupdate={onTimeUpdate}
		on:ended={onEnded}
	/>

	<button type="button" disabled={isLoading} on:click={togglePlay}>
		{#if isLoading}
			<Spinner />
		{:else if isPlaying}
			<Pause />
		{:else}
			<Play />
		{/if}
	</button>

	<Range
		value={currentTime}
		min={0}
		max={duration}
		on:change={({ detail }) => seek(detail.value)}
	/>

	<div class="time">
		<span>{toMinutes(currentTime)}</span>
		<span>-{toMinutes(duration - currentTime)}</span>
	</div>
</div>

<style lang="scss">
	.player {
		button {
			background: white;
			border-radius: 50%;
			padding: 16px;
			border: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			margin: 0 0 16px;

			transition: all 0.15s ease-in-out;

			&:active {
				transform: scale(0.9);
			}
		}

		.time {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: white;
		}

		:global(svg) {
			height: 24px;
			width: 24px;
			fill: var(--gray-4);
		}
	}
</style>
