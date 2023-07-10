<script lang="ts">
	import BackButton from '$components/BackButton.svelte';
	import Button from '$components/Button.svelte';
	import type { GlassfySku } from 'capacitor-plugin-glassfy';
	import Page from '$components/Page.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import Plan from './Plan.svelte';
	import { Routes } from '$lib/routes';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { setPaidSubscription } from '$lib/user';
	import { getSubscriptionPlans, isCancelPurchaseError, purchasePlan } from '$api/glassfy';
	import { showErrorToast, showSuccessToast } from '$lib/toast';

	let selected = 'test_annual';

	async function subscribe(selectedPlan: GlassfySku) {
		try {
			await purchasePlan(selectedPlan);

			// The user's `subscription.isValid` property is going to be updated through Glassfy's webhook.
			// However, we don't want the user to wait, so we change the local prop immediately.
			setPaidSubscription();

			showSuccessToast('Честито! Успешно се абонира за Masterpeace!');

			const redirect = $page?.url.searchParams.get('redirect') || Routes.HOME;
			goto(redirect);
		} catch (e) {
			if (!isCancelPurchaseError(e)) {
				showErrorToast('Хм, не успяхме да те абонираме. Моля, опитай отново по-късно.');
			}
		}
	}
</script>

<Page>
	<BackButton />

	<PageHeader>
		Абонаментни планове

		<svelte:fragment slot="subheader">Изберете своя абонаментен план</svelte:fragment>
	</PageHeader>

	<section>
		{#await getSubscriptionPlans()}
			Зареждане..
		{:then plans}
			{#each plans as plan (plan.skuId)}
				<Plan
					name={plan.product.title}
					price={(plan.extravars?.visiblePrice || plan.product.price).toString()}
					description={plan.extravars?.description}
					label={plan.extravars?.label}
					selected={selected === plan.skuId}
					on:click={() => (selected = plan.skuId)}
				/>
			{/each}

			<Button
				--background-color="var(--action-color-3)"
				on:click={() => subscribe(plans.find((p) => p.skuId === selected))}
			>
				Започни абонамент
			</Button>
		{/await}
	</section>
</Page>

<style lang="scss">
	section {
		margin-top: 32px;
	}
</style>
