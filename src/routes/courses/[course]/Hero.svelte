<script lang="ts">
	export let height: number;
	export let scrollY: number;
	export let backgroundImage: string;
</script>

<div
	class="hero"
	bind:clientHeight={height}
	style:background-image="url({backgroundImage})"
	style:transform={`translateY(${scrollY / 2.5}px)`}
	style:opacity={scrollY > height - 110 ? 50 / scrollY : 1}
/>

<style lang="scss">
	.hero {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 40vh;
		background-color: var(--background-color-1);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: filter 0.25s ease-in-out, opacity 0.25s ease-in-out;
	}
</style>
