<script lang="ts">
	import type { Course } from '$types';
	import HeartButton from '$components/HeartButton.svelte';
	import Lock from '$icons/Lock.svelte';
	import { Routes } from '$lib/routes';
	import { goto } from '$app/navigation';
	import { hasPaidSubscription } from '$stores/user';

	export let course: Course;

	function openCourse() {
		goto(Routes.course(course.id));
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="course" on:click={openCourse}>
	<div class="thumb">
		<img src={course?.thumb} alt="Изображение на курс '{course.name}'" />

		<span class="sessions">{course?.sessions?.length} сесии</span>

		<span class="heart">
			<HeartButton courseId={course?.id} />
		</span>

		{#if !$hasPaidSubscription}
			<span class="lock">
				<Lock />
			</span>
		{/if}
	</div>

	<div class="title">
		{course.name}
	</div>
</div>

<style lang="scss">
	.course {
		width: var(--width, 200px);
		border-radius: 6px;
		text-align: left;
		cursor: pointer;
		text-decoration: none;

		.thumb {
			position: relative;
			height: var(--height, 200px);
			width: var(--width, 200px);
			transition: all 0.4s ease 0s;

			img {
				height: var(--height, 200px);
				width: var(--width, 200px);
				object-fit: cover;
				border-radius: 6px;
			}

			.sessions {
				position: absolute;
				left: 8px;
				bottom: 12px;
				border-radius: 4px;
				background-color: var(--backdrop-background-color);
				color: var(--backdrop-text-color);
				font-size: 12px;
				padding: 0px 8px;
				text-transform: uppercase;
			}

			.heart {
				display: flex;
				position: absolute;
				top: 16px;
				right: 16px;

				color: white;
				background-color: var(--backdrop-background-color);
				padding: 3px;
				border-radius: 25%;
			}

			.lock {
				position: absolute;
				bottom: 16px;
				right: 16px;

				background-color: var(--backdrop-background-color);
				color: var(--backdrop-text-color);

				:global(svg) {
					height: 16px;
				}
			}
		}

		.title {
			margin: 8px 0;
			color: var(--text-color-1);
			font-size: 17px;
			font-weight: 600;
		}

		&:hover .thumb {
			transform: translate(0px, -8px);
			box-shadow: rgb(24 24 24 / 50%) 0px 10px 40px -10px;
		}
	}
</style>
