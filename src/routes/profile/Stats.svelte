<script lang="ts">
	import Kpi from './Kpi.svelte';
	import { stats } from '$stores/user';

	$: kpis = [
		{
			value: $stats?.runStreak,
			label: 'Непрекъснати дни'
		},
		{
			value: $stats?.timeMeditated,
			label: 'Минути'
		},
		{
			value: $stats?.completedSessions,
			label: 'Сесии'
		}
	];
</script>

<div class="stats">
	{#each kpis as { value, label } (label)}
		<Kpi {value} {label} />
	{/each}
</div>

<style lang="scss">
	.stats {
		display: flex;
		justify-content: space-evenly;
		margin-top: 32px;
		gap: 12px;
	}
</style>
