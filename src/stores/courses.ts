import type { Course } from '$types';
import { firestore } from '$lib/firebase';
import { user } from './user';
import { derived, readable } from 'svelte/store';
import { collection, getDocs } from 'firebase/firestore';

export const courses = readable<Course[]>(undefined, (set) => {
	const fetchData = async () => {
		const courseRefs = collection(firestore, 'courses');
		const courseDocs = await getDocs(courseRefs);

		const value: Course[] = [];

		courseDocs.forEach((courseDoc) => {
			value.push(courseDoc.data() as any);
		});

		set(value);
	};

	fetchData();

	return () => {
		//
	};
});

export const coursesLoading = derived(courses, ($courses) => $courses === undefined);

const favoriteIds = derived(user, ($user) =>
	Object.entries($user?.courses ?? {})
		.filter(([, value]: any[]) => value?.isSaved)
		.map(([key]) => key)
);

export const favorites = derived(
	[favoriteIds, courses],
	([$favoriteIds, $courses]) => $courses?.filter((c) => $favoriteIds.includes(c.id)) ?? []
);

export const hasFavorites = derived(favorites, ($favorites) => !!$favorites?.length);

export const spotlight = derived([user, favorites, courses], ([$user, $favorites, $courses]) => {
	return (
		// If there's a next session in the most recently played course
		$courses?.find(
			(c) =>
				c.id === $user?.lastSession?.courseId && $user?.lastSession?.order + 1 <= c.sessions.length
		) ||
		// or if there's a course in favorites that is not completed
		$favorites.find((c) => $user.courses[c.id].lastSession + 1 <= c.sessions.length) ||
		// or if there's a course in favorites at all
		$favorites?.[0] ||
		// or the first course in the list
		$courses?.[0]
	);
});
