<script lang="ts">
	export let value: number;
	export let label: string;
</script>

<div class="kpi">
	<div class="value">{value}</div>
	<div class="label">{label}</div>
</div>

<style lang="scss">
	.kpi {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color-2);
		border-radius: 10px;
		padding: 22px 12px;
		flex: 1;

		.value {
			font-size: 20px;
			font-weight: bold;
			color: var(--text-color-1);
		}

		.label {
			font-size: 10px;
			text-transform: uppercase;
			margin-top: 12px;
			color: var(--text-color-3);
			text-align: center;
		}
	}
</style>
