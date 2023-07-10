import { firestore } from '$lib/firebase';
import { get } from 'svelte/store';
import { userId } from '../stores/user';
import type { Course, Session } from '$types';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';

export function toggleCourseFavorite(courseId: string, isLiked: boolean) {
	const $userId = get(userId);

	const userRef = doc(firestore, 'users', $userId);

	return updateDoc(userRef, {
		[`courses.${courseId}.isSaved`]: isLiked
	});
}

export function completeSession(session: Session, course: Course) {
	const $userId = get(userId);

	const completedSession = {
		order: session.order,
		duration: session.audios[0].duration,
		course: {
			id: course.id,
			sessionsCount: course.sessions.length
		}
	};

	const completedSessionsRef = collection(firestore, `users/${$userId}/completedSessions`);

	return addDoc(completedSessionsRef, completedSession);
}
