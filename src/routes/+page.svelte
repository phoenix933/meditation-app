<script lang="ts">
	import Course from '$components/Course.svelte';
	import Page from '$components/Page.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import PageList from '$components/PageList.svelte';
	import { hasFavorites, courses, favorites, coursesLoading, spotlight } from '$stores/courses';

	$: list = ($hasFavorites ? $favorites : $courses)?.slice(0, 6);
</script>

<Page>
	<PageHeader>
		Здравей

		<svelte:fragment slot="subheader">
			20 милиона души са участвали в 800 хиляди медитации днес
		</svelte:fragment>
	</PageHeader>

	<PageList title={$hasFavorites ? 'Продължи' : 'Започни'}>
		{#if $spotlight}
			<Course course={$spotlight} --width="100%" />
		{/if}
	</PageList>

	<PageList title="За теб" horizontal>
		{#if $coursesLoading}
			Зареждане..
		{:else}
			{#each list as course}
				<Course {course} />
			{/each}
		{/if}
	</PageList>
</Page>
