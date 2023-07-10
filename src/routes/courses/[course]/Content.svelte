<script lang="ts">
	import Button from '$components/Button.svelte';
	import type { Course } from '$types';
	import HeartButton from '$components/HeartButton.svelte';
	import Lock from '$icons/Lock.svelte';
	import Play from '$icons/Play.svelte';
	import { Routes } from '$lib/routes';
	import { goto } from '$app/navigation';
	import { user, hasPaidSubscription } from '$stores/user';

	export let course: Course;

	function getNextSession() {
		const storedCourse = $user.courses?.[course?.id];

		return storedCourse?.lastSession < storedCourse?.sessionsCount
			? storedCourse.lastSession + 1
			: 1;
	}

	function playIfHasPaidSubscription() {
		const nextSession = getNextSession();
		const nextSessionRoute = Routes.session(course?.id, nextSession);

		const gotoRoute = $hasPaidSubscription
			? nextSessionRoute
			: Routes.subscribeWithRedirect(nextSessionRoute);
		goto(gotoRoute);
	}

	$: hasPlayedPreviously = $user.courses?.[course?.id]?.maxSession > 0;
</script>

<div class="content">
	<div class="title">
		<div>
			<h1>{course?.name ?? '-'}</h1>
			<p>{course?.sessions?.length || '-'} сесии</p>
		</div>

		<HeartButton courseId={course?.id} />
	</div>

	<Button on:click={playIfHasPaidSubscription}>
		{#if $hasPaidSubscription}
			<Play />
			{hasPlayedPreviously ? 'Продължи' : 'Започни'}
		{:else}
			<Lock />
			Абонирай се
		{/if}
	</Button>

	<p class="description">
		{course?.description}
	</p>
</div>

<style lang="scss">
	.content {
		position: absolute;
		/* top: -24px; */
		top: calc(40vh - 24px);
		padding: 24px;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		background-color: var(--background-color-1);

		width: 100%;
		box-sizing: border-box;

		.title {
			display: flex;
			justify-content: space-between;

			h1 {
				font-size: 24px;
				font-weight: 600;
				margin: 0;
				color: var(--text-color-1);
			}

			p {
				font-size: 13px;
				letter-spacing: 0.22px;
				color: var(--text-color-3);
				margin: 8px 0 24px;
			}
		}

		.description {
			color: var(--text-color-1);
			font-size: 15px;
			line-height: 28px;
			letter-spacing: -0.15px;
		}
	}
</style>
