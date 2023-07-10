<script lang="ts">
	import Course from '$components/Course.svelte';
	import { Routes } from '$lib/routes';
	import { coursesLoading, favorites } from '$stores/courses';
</script>

{#if $coursesLoading}
	Зареждане..
{:else}
	<div class:list={$favorites?.length}>
		{#each $favorites as course}
			<Course {course} --height="20vh" --width="100%" />
		{:else}
			<div class="empty">
				Все още нямаш нищо тук.
				<br /> <br />
				<a href={Routes.DISCOVER}>Виж всички курсове</a> и добави тези, които ти харесват, в списъка с любими.
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
		padding: 16px 0;
	}

	.empty {
		text-align: left;
		padding: 16px;
	}
</style>
