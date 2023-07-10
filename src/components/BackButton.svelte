<script lang="ts">
	import ArrowLeft from '$icons/ArrowLeft.svelte';
	import { goBack } from '$lib/routes';
</script>

<button type="button" class="back" on:click={goBack}>
	<ArrowLeft />
</button>

<style lang="scss">
	.back {
		background: var(--background-color-1);
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 8px;
		padding: 8px;
		margin: 0;

		:global(svg) {
			height: 16px;
			fill: var(--text-color-1);
		}
	}
</style>
