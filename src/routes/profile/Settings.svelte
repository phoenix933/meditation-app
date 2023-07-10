<script lang="ts">
	import Toggle from '$components/Toggle.svelte';
	import { onMount } from 'svelte';
	import { isDarkMode, toggleDarkMode } from '$lib/theme';

	let darkMode: boolean;

	function onChange({ detail }: { detail: boolean }) {
		darkMode = detail;
		toggleDarkMode(darkMode);
	}

	onMount(async () => {
		darkMode = await isDarkMode();
	});
</script>

<div>
	<Toggle checked={darkMode} on:change={onChange}>Включи тъмна тема</Toggle>
</div>

<style lang="scss">
	div {
		margin: 1rem 0;
	}
</style>
