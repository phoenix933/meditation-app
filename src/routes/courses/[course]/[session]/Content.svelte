<div class="content">
    <slot />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		color: white;
		font-size: 56px;
		font-weight: 200;

        transition: all 0.3s ease;

        :global(*) {
            transition: all 0.3s ease;
        }
	}
</style>
