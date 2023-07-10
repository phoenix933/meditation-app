import { Routes } from '$lib/routes';
import { get } from 'svelte/store';
import { hasPaidSubscription } from '$stores/user';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const $hasPaidSubscription = get(hasPaidSubscription);

	if ($hasPaidSubscription) {
		throw redirect(308, Routes.HOME);
	}

	return {};
}
