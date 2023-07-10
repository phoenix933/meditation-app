<script lang="ts">
	export let title: string;
	export let horizontal = false;
</script>

<div>
	<h2>{title}</h2>

	<div class="list" class:horizontal>
		<slot />
	</div>
</div>

<style lang="scss">
	h2 {
		font-size: 22px;
		text-align: left;
		font-weight: 600;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 16px 0;

		&.horizontal {
			flex-direction: row;
			gap: 8px;
			overflow-x: auto;
			scrollbar-width: 0;
		}
	}
</style>
