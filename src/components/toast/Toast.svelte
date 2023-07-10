<script lang="ts">
	import Check from '$icons/Check.svelte';
	import Close from '$icons/Close.svelte';
	import Exclamation from '$icons/Exclamation.svelte';
	import type { Toast } from '$types/Toast';
	import { createEventDispatcher } from 'svelte';

	export let toast: Toast;

	const dispatch = createEventDispatcher();

	const close = () => dispatch('close');
</script>

<div class="toast {toast.type}">
	<div class="content">
		<div class="icon">
			{#if ['success', 'info'].includes(toast.type)}
				<Check />
			{:else}
				<Exclamation />
			{/if}
		</div>

		<div class="message">{toast.message}</div>

		<button type="button" class="close" on:click={close}>
			<Close />
		</button>
	</div>

	<div class="progress" />
</div>

<style lang="scss">
	.toast {
		position: relative;
		box-sizing: border-box;
		padding: 24px 16px;
		max-width: 360px;
		border-radius: 6px;

		background: var(--background-color-1);
		box-shadow: 0px 6px 33px 4px var(--shadow-color-1);

		&.success {
			--main-color: var(--success-color);
		}

		&.info {
			--main-color: var(--info-color);
		}

		&.warning {
			--main-color: var(--warning-color);
		}

		&.error {
			--main-color: var(--error-color);
		}

		.content {
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				width: 30px;
				color: var(--main-color);
				margin-right: 16px;

				:global(svg) {
					height: 30px;
				}
			}

			.message {
				font-size: 15px;
				font-weight: bold;
			}

			.close {
				position: absolute;
				top: -10px;
				right: -2px;

				cursor: pointer;

				padding: 16px;
				color: var(--text-color-4);
				background: transparent;
				border: none;

				:global(svg) {
					height: 12px;
				}
			}
		}

		.progress {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 6px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			background-color: var(--main-color);
		}
	}
</style>
