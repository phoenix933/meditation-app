<script lang="ts">
	import Content from './Content.svelte';
	import Header from './Header.svelte';
	import Hero from './Hero.svelte';
	import { courses } from '$stores/courses';
	import { expoIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	let scrollY: number;
	let heroHeight: number;

	$: courseId = $page?.params?.course;
	$: course = $courses?.find((c) => c.id === courseId);
</script>

<svelte:window bind:scrollY />

<main
	in:fly={{ x: 150, duration: 400, easing: expoIn }}
	out:fly={{ x: 350, duration: 400, easing: expoIn, opacity: 1 }}
>
	<Hero bind:height={heroHeight} {scrollY} backgroundImage={course?.thumb} />

	<Header {course} scrolled={scrollY > heroHeight - 70} />

	<Content {course} />
</main>

<style lang="scss">
	main {
		position: relative;
		// prevents other content from appearing on top of the page when out animation plays
		z-index: 1;
	}
</style>
