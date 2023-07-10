<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let checked: boolean;

	const dispatch = createEventDispatcher();
	const change = (checked: boolean) => dispatch("change", checked);

	function toggle() {
		checked = !checked;

		change(checked);
	}
</script>

<button class="toggle" on:click={toggle}>
	<span class="label">
		<slot />
	</span>

	<div class="switch" class:checked />
</button>

<style lang="scss">
	.toggle {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;

		background: none;
		border: none;
		padding: 0;

		margin: 6px 0;

		.label {
			font-size: 14px;
			color: var(--text-color-1);
			text-align: left;
		}

		.switch {
			$height: 20px;
			$width: 48px;
			$padding: 4px;

			flex: auto 0 0;

			display: inline-block;
			background: var(--background-color-2);
			border-radius: 16px;
			width: $width;
			height: $height;
			position: relative;
			vertical-align: middle;
			transition: background 0.25s;

			&:before,
			&:after {
				content: "";
			}

			&:before {
				$size: calc($height - 2 * $padding);

				display: block;
				background: linear-gradient(to bottom, var(--text-color-1) 0%, var(--text-color-2) 100%);
				border-radius: 50%;
				width: $size;
				height: $size;
				position: absolute;
				top: $padding;
				left: $padding;
				transition: left 0.25s;
			}

			&.checked {
				background: var(--action-color-1);

				&:before {
					left: calc($width - $height + $padding);
				}
			}

			&:hover {
				.switch {
					&:before {
						background: linear-gradient(
							to bottom,
							#fff 0%,
							#fff 100%
						);
					}
				}
			}
		}
	}
</style>
