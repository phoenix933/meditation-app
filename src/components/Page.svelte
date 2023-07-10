<main>
    <slot />
</main>

<style lang="scss">
    main {
		margin: 0 auto;
        text-align: center;
		padding: max(16px, env(safe-area-inset-top)) 16px max(100px, env(safe-area-inset-bottom));
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>