<div>
	<h1><slot /></h1>

	{#if $$slots.subheader}
		<p><slot name="subheader" /></p>
	{/if}
</div>

<style lang="scss">
	h1 {
		font-size: 32px;
		font-weight: 600;
		margin: 0;
		padding: 24px 0 8px;
	}

	p {
		color: var(--text-color-2);
		font-size: 16px;
		padding: 0 25%;
		margin: 0;
	}
</style>
