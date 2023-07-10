<script lang="ts">
	import Course from '$components/Course.svelte';
	import Page from '$components/Page.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import PageList from '$components/PageList.svelte';
	import { courses, coursesLoading } from '$stores/courses';

	$: course = $courses?.[0];
</script>

<Page>
	<PageHeader>
		Курсове

		<svelte:fragment slot="subheader">
			Избери си курс по медитация, който искаш да започнеш
		</svelte:fragment>
	</PageHeader>

	<PageList title="Препоръчваме">
		{#if course}
			<Course {course} --height="40vh" --width="100%" />
		{/if}
	</PageList>

	<PageList title="Всички курсове">
		{#if $coursesLoading}
			Зареждане..
		{:else}
			{#each $courses as course}
				<Course {course} --width="100%" />
			{/each}
		{/if}
	</PageList>
</Page>
