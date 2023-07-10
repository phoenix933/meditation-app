import { FIREBASE_CONFIG } from '$lib/env';
import { Capacitor } from '@capacitor/core';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';

const app = initializeApp(FIREBASE_CONFIG);

export const auth = Capacitor.isNativePlatform()
	? initializeAuth(app, {
			persistence: indexedDBLocalPersistence
	  })
	: getAuth();
export const firestore = getFirestore(app);
