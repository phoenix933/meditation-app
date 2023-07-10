import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';
import { auth } from '$lib/firebase';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithCredential,
	signOut as firebaseSignOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword
} from 'firebase/auth';

export function signUp(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
	if (Capacitor.isNativePlatform()) {
		const googleUser = await GoogleAuth.signIn();
		const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);

		return signInWithCredential(auth, credential);
	} else {
		const provider = new GoogleAuthProvider();

		return signInWithPopup(auth, provider);

		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// const token = credential?.accessToken;

		// console.log('RESULT', { user: result.user, token, credential });
	}
}

export async function signOut() {
	return firebaseSignOut(auth);
}
