<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;

	export let style: 'solid' | 'outlined' = 'solid';
</script>

<button class={style} {type} {disabled} on:click>
	<slot />
</button>

<style lang="scss">
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		border-radius: 6px;
		padding: 12px 24px;

		font-size: 16px;
		font-weight: 500;
		cursor: pointer;

		border: 1px solid var(--gray-9);
		color: var(--text-color-1);

		transition: all 0.65s cubic-bezier(0.05, 0.2, 0.1, 1) 0s;

		:global(svg) {
			height: 20px;
			fill: white;
			margin-right: 12px;
		}

		&:disabled {
			filter: brightness(0.8);
		}

		&.solid {
			background-color: var(--background-color, var(--action-color-1));
			color: var(--action-color-1-inverted);
			border-color: transparent;
		}

		&.outlined {
			background-color: transparent;
		}
	}
</style>
