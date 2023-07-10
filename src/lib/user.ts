import { user } from '$stores/user';

/**
 * The user's `subscription.isValid` property is going to be updated through Glassfy's webhook.
 	However, we don't want the user to wait, so we change the local prop immediately.
 */
export function setPaidSubscription() {
	user.update((u) => ({
		...u,
		subscription: {
			...u.subscription,
			isValid: true
		}
	}));
}
