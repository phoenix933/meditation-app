<script lang="ts">
	import Header from './Header.svelte';
	import Page from '$components/Page.svelte';
	import Settings from './Settings.svelte';
	import SignOut from './SignOut.svelte';
	import Stats from './Stats.svelte';
</script>

<Page>
	<Header />

	<Stats />

	<Settings />

	<SignOut />
</Page>
