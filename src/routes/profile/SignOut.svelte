<script lang="ts">
	import Button from '$components/Button.svelte';
	import { Routes } from '$lib/routes';
	import Spinner from '$components/Spinner.svelte';
	import * as auth from '$api/auth';
	import { goto } from '$app/navigation';

	let loading = false;

	async function signOut() {
		try {
			loading = true;

			await auth.signOut();
		} catch (e) {
			//
		} finally {
			loading = false;
		}

		goto(Routes.LOGIN);
	}
</script>

<Button style="outlined" disabled={loading} on:click={signOut}>
	{#if loading}
		<Spinner />
	{:else}
		Излез
	{/if}
</Button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--background-color-1);
		border: 1px solid rgb(231, 230, 230);
		outline: none;
		border-radius: 8px;
		padding: 16px 16px;
		font-weight: 600;

		margin-top: 24px;
	}
</style>
