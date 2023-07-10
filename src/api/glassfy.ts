import { Capacitor } from '@capacitor/core';
import { GLASSFY_API_KEY } from '$lib/env';
import { GLASSFY_TEST_PLANS } from '$config/subscriptions';
import { get } from 'svelte/store';
import { user } from '$stores/user';
import { Glassfy, type GlassfySku } from 'capacitor-plugin-glassfy';

let initialized = false;

async function initGlassfy() {
	await Glassfy.initialize({
		apiKey: GLASSFY_API_KEY,
		watcherMode: false
	});

	initialized = true;

	const $user = get(user);
	syncCustomProps($user.email, $user.id);
}

function syncCustomProps(email: string, userId: string) {
	Glassfy.setEmailUserProperty({ email: email });
	Glassfy.setExtraUserProperty({ extra: { customId: userId } });
}

export async function getSubscriptionPlans(): Promise<GlassfySku[]> {
	if (!Capacitor.isNativePlatform()) {
		return GLASSFY_TEST_PLANS;
	}

	if (!initialized) {
		await initGlassfy();
	}

	const offerings = await Glassfy.offerings();
	const subscriptionsOffering = offerings.all.find((o) => o.offeringId === 'test_subscriptions');

	return subscriptionsOffering.skus;
}

export async function purchasePlan(sku: GlassfySku) {
	if (!Capacitor.isNativePlatform()) {
		return {};
	}

	const transaction = await Glassfy.purchaseSku({ sku });

	return transaction;
}

export function isCancelPurchaseError(e: any) {
	return e?.toString().includes('code=UserCancelPurchase');
}
