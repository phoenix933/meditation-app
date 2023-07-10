<script lang="ts">
	import Toast from './Toast.svelte';
	import { backInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { removeToast } from '$lib/toast';
	import { toasts } from '$stores/app';
</script>

<div class="toaster">
	{#each $toasts as toast (toast.id)}
		<div class="toast" transition:fly|local={{ y: 60, duration: 500, easing: backInOut }}>
			<Toast {toast} on:close={() => removeToast(toast.id)} />
		</div>
	{/each}
</div>

<style>
	.toaster {
		position: fixed;
		bottom: calc(env(safe-area-inset-bottom) + 30px);
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;

		display: flex;
		flex-direction: column-reverse;
		gap: 24px;
	}

	.toast :global(.toast) {
		width: calc(100vw - 32px);
	}
</style>
