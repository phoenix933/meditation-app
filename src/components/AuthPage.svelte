<script lang="ts">
	import Button from '$components/Button.svelte';
	import Google from '$icons/Google.svelte';
	import Page from '$components/Page.svelte';
	import { Routes } from '$lib/routes';
	import Spinner from '$components/Spinner.svelte';
	import { goto } from '$app/navigation';
	import { showErrorToast } from '$lib/toast';
	import { signIn, signInWithGoogle, signUp } from '$api/auth';

	export let mode: 'signup' | 'login';

	let email: string;
	let password: string;

	let authLoading = false;
	let signInWithGoogleLoading = false;

	const goToHome = () => goto(Routes.HOME);

	async function authenticate() {
		if (email && password) {
			try {
				authLoading = true;

				const authFunction = mode === 'signup' ? signUp : signIn;

				await authFunction(email, password);

				goToHome();
			} catch (e: any) {
				let message = 'Възникна грешка. Опитай пак по-късно';

				if (e?.code === 'auth/user-not-found') {
					message = 'Грешен имейл и/или парола!';
				}

				showErrorToast(message);
			} finally {
				authLoading = false;
			}
		}
	}

	async function handleSignInWithGoogle() {
		try {
			signInWithGoogleLoading = true;

			await signInWithGoogle();

			goToHome();
		} catch (e) {
			showErrorToast('Неуспешно влизане с Google. Опитай пак по-късно');
		} finally {
			signInWithGoogleLoading = false;
		}
	}
</script>

<Page>
	<h1>{mode === 'signup' ? 'Регистрация' : 'Влизане'}</h1>

	<form on:submit|preventDefault={authenticate}>
		<label for="email">Имейл</label>
		<input bind:value={email} class="input" id="email" type="email" />

		<label for="password">Парола</label>
		<input bind:value={password} class="input" id="password" type="password" />

		<Button type="submit" disabled={authLoading}>
			{#if authLoading}
				<Spinner --color="var(--action-color-1-inverted)" />
			{:else}
				{mode === 'signup' ? 'Регистрирай се' : 'Влез'}
			{/if}
		</Button>

		<a href={mode === 'signup' ? Routes.LOGIN : Routes.SIGNUP}
			>{mode === 'signup'
				? 'Вече имаш акаунт? Влез сега!'
				: 'Все още нямаш акаунт? Регистрирай се!'}</a
		>
	</form>

	<Button style="outlined" disabled={signInWithGoogleLoading} on:click={handleSignInWithGoogle}>
		{#if signInWithGoogleLoading}
			<Spinner --color="var(--text-color-1)" />
		{:else}
			<Google />
			{mode === 'signup' ? 'Регистрирай се' : 'Влез'} с Google
		{/if}
	</Button>
</Page>

<style lang="scss">
	h1 {
		margin-bottom: 48px;
	}

	form {
		input[type='email'],
		input[type='password'] {
			width: 100%;
			border-radius: 8px;
			padding: 12px 16px;
			margin: 8px 0 16px;
			color: var(--text-color-1);
			background-color: var(--background-color-2);
			font-size: 16px;
			transition: all 150ms ease-in-out;

			&:focus-visible {
				border-color: var(--action-color-1);
				outline: none;
			}
		}

		label {
			color: var(--text-color-2);
			font-size: 13px;
		}

		a {
			color: var(--action-color-1);
			display: flex;
			justify-content: center;
			padding: 12px;
			margin-bottom: 24px;
		}
	}
</style>
