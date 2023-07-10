<span class="spinner" />

<style>
	.spinner {
		width: var(--size, 24px);
		height: var(--size, 24px);
		border: 3px solid var(--color, #55999a);
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
