<script lang="ts">
	import Heart from '$icons/Heart.svelte';
</script>

<div class="icon">
	<Heart />
</div>

<h2>Любими</h2>

<style lang="scss">
	h2 {
		font-size: 22px;
		text-align: left;
		font-weight: 600;
		margin-top: 8px;
	}

	.icon {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--action-color-1);
		margin-right: 8px;
		padding: 8px;
		border-radius: 10px;
		margin-top: 16px;

		:global(svg) {
			height: 20px;
			fill: white;
		}
	}
</style>
