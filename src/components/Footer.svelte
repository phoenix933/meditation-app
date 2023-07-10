<script>
	import Graduation from '$icons/Graduation.svelte';
	import Heart from '$icons/Heart.svelte';
	import Home from '$icons/Home.svelte';
	import User from '$icons/User.svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	import { expoIn } from 'svelte/easing';

	const routes = [
		{
			url: '/',
			icon: Home,
			title: 'Начало'
		},
		{
			url: '/discover',
			icon: Graduation,
			title: 'Курсове'
		},
		{
			url: '/favorites',
			icon: Heart,
			title: 'Любими'
		},
		{
			url: '/profile',
			icon: User,
			title: 'Профил'
		}
	];
</script>

<footer transition:fly|local={{ y: 120, duration: 500, easing: expoIn }}>
	{#each routes as { url, icon, title }}
		<a href={url} class:active={$page.url.pathname === url}>
			<svelte:component this={icon} />
			<span>{title}</span>
		</a>
	{/each}
</footer>

<style lang="scss">
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--background-color-1);

		z-index: 1;

		padding: 16px 16px max(16px, env(safe-area-inset-bottom));
		display: flex;
		align-items: center;
		justify-content: space-around;

		box-shadow: 0px 0px 10px 0px var(--shadow-color-1);
	}

	a {
		display: flex;
		align-items: center;
		flex-direction: column;
		color: var(--text-color-4);
		font-size: 11px;
		width: 40px;
		gap: 10px;
		font-weight: 600;

		:global(svg) {
			height: 20px;
			fill: var(--text-color-4);
		}

		&:hover,
		&.active {
			text-decoration: none;
			color: var(--text-color-1);

			:global(svg) {
				fill: var(--text-color-1);
			}
		}
	}
</style>
