import type { User } from '$types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '$lib/firebase';
import { derived, writable } from 'svelte/store';
import { doc, onSnapshot } from 'firebase/firestore';

export const user = writable<User | null>(undefined, () => {
	let unsubscribeUserDoc: () => void;

	const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
		console.log('AUTH STATE CHANGED', firebaseUser);

		if (unsubscribeUserDoc) {
			unsubscribeUserDoc();
		}

		if (firebaseUser) {
			const { uid: id } = firebaseUser;

			unsubscribeUserDoc = onSnapshot(doc(firestore, 'users', id), (doc) => {
				console.log('Current data: ', doc.data());
				user.set((doc.data() as any) || null);
			});
		} else {
			user.set(null);
		}
	});

	return () => {
		unsubscribeAuth();

		if (unsubscribeUserDoc) {
			unsubscribeUserDoc();
		}
	};
});

export const userId = derived(user, ($user) => $user?.id);
export const userLoading = derived(user, ($user) => $user === undefined);
export const isAuthenticated = derived(user, ($user) => !!$user);

export const stats = derived(user, ($user) => $user?.stats);
export const hasPaidSubscription = derived(user, ($user) => $user?.subscription?.isValid);
