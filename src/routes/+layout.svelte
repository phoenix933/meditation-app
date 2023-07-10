<script lang="ts">
	import '$styles/global.scss';
	import Footer from '$components/Footer.svelte';
	import Loading from '$components/Loading.svelte';
	import Toaster from '$components/toast/Toaster.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { isFooterRoute } from '$config/footer';
	import { onMount } from 'svelte';
	import { Routes } from '$lib/routes';
	import { isDarkMode, toggleDarkMode } from '$lib/theme';
	import { navigating, page } from '$app/stores';
	import { userLoading, isAuthenticated } from '$stores/user';

	let loading = true;
	let footerVisible = false;

	async function redirect() {
		if (!$isAuthenticated) {
			await goto(Routes.LOGIN);
		}

		loading = false;
	}

	function setFooterVisibility(route: string) {
		footerVisible = isFooterRoute(route);
	}

	onMount(async () => {
		const darkMode = await isDarkMode();
		toggleDarkMode(darkMode, false);

		setFooterVisibility($page.route.id);
	});

	$: if (!$userLoading) {
		redirect();
	}

	$: if ($navigating) {
		setFooterVisibility($navigating.to.route.id);
	}
</script>

<svelte:head>
	<title>Masterpeace</title>
</svelte:head>

<main>
	{#if loading}
		<Loading />
	{:else}
		<div in:fade|local={{ duration: 1000 }}>
			<slot />
		</div>

		{#if footerVisible}
			<Footer />
		{/if}
	{/if}
</main>

<Toaster />
