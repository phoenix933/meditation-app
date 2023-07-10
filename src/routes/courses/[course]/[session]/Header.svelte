<script lang="ts">
	import Close from '$icons/Close.svelte';
	import { goBack } from '$lib/routes';
</script>

<header>
	<button class="close" type="button" on:click={() => goBack()}>
		<Close />
	</button>
</header>

<style lang="scss">
	header {
		padding: 0 24px;
		align-self: flex-start;

		.close {
			padding: 8px;
			margin: 0;
			border: 0;
			display: flex;
			background: var(--backdrop-background-color);
			border-radius: 50%;

			:global(svg) {
				fill: var(--backdrop-text-color);
				height: 20px;
				width: 20px;
			}
		}
	}
</style>
