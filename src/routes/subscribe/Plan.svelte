<script lang="ts">
	export let name: string;
	export let price: string;
	export let description: string = null;
	export let label: string = null;

    export let selected = false
</script>

<button type="button" class="plan" class:selected on:click>
	{#if label}
		<div class="label">{label}</div>
	{/if}

	<div class="name">{name}</div>

	<div class="price">{price}</div>

	{#if description}
		<div class="description">*{description}</div>
	{/if}
</button>

<style lang="scss">
	.plan {
		text-align: left;
		padding: 16px;
		position: relative;
		background: var(--background-color-2);
		border-radius: 6px;
		margin-bottom: 16px;

        border: none;
        width: 100%;
        cursor: pointer;
        
        box-shadow: 0px 5px 8px -6px var(--shadow-color-1);
        transition: all 0.4s ease 0s;

		.label {
			background: var(--action-color-3);
			color: var(--action-color-3-inverted);
			font-size: 12px;
			text-transform: uppercase;
			position: absolute;
			top: -10px;
			right: 10px;
			padding: 4px 12px;
			border-radius: 6px;
		}

		.name {
			font-size: 18px;
            font-weight: 300;
		}

		.price {
			font-size: 24px;
			padding: 16px 0;
            font-weight: 500;
		}

		.description {
			font-size: 11px;
			color: var(--text-color-3);
            font-weight: 300;
		}

        .name,
        .price,
        .description {
            color: var(--text-color-2);
        }

        &:hover {
            box-shadow: 0px 5px 8px -2px var(--shadow-color-1);
        }

        &.selected {
            background-color: var(--action-color-2);

            .name,
            .price,
            .description {
                color: var(--action-color-2-inverted);
            }
        }
	}
</style>
