<script lang="ts">
	// Source: https://svelte.dev/repl/7f0042a186ee4d8e949c46ca663dbe6c?version=3.33.0
	import { createEventDispatcher } from 'svelte';
	import { toMinutes } from '$lib/format';
	import { fly, fade } from 'svelte/transition';

	// Props
	export let min = 0;
	export let max = 100;
	export let value: number;

	const dispatch = createEventDispatcher();

	const change = (value: any) => dispatch('change', { value });

	// Node Bindings
	let container: HTMLDivElement;
	let thumb: HTMLDivElement;
	let progressBar: HTMLDivElement;
	let element: HTMLDivElement;

	// Internal State
	let elementX = 0;
	let currentThumb: HTMLDivElement;
	let thumbHover = false;
	let keydownAcceleration = 0;
	let accelerationTimer: any;

	// Mouse shield used onMouseDown to prevent any mouse events penetrating other elements,
	// ie. hover events on other elements while dragging. Especially for Safari
	const mouseEventShield = document.createElement('div');
	mouseEventShield.setAttribute('class', 'mouse-over-shield');
	mouseEventShield.addEventListener('mouseover', (e) => {
		e.preventDefault();
		e.stopPropagation();
	});

	function resizeWindow() {
		elementX = element.getBoundingClientRect().left;
	}

	// Allows both bind:value and on:change for parent value retrieval
	function setValue(val: any) {
		value = val;
		change(value);
	}

	function onTrackEvent(e: MouseEvent & any) {
		// Update value immediately before beginning drag
		updateValueOnEvent(e);
		onDragStart(e);
	}

	function onDragStart(e: MouseEvent & any) {
		// If mouse event add a pointer events shield
		if (e.type === 'mousedown') {
			document.body.append(mouseEventShield);
		}

		currentThumb = thumb;
	}

	function onDragEnd(e: MouseEvent & any) {
		// If using mouse - remove pointer event shield
		if (e.type === 'mouseup') {
			if (document.body.contains(mouseEventShield)) {
				document.body.removeChild(mouseEventShield);
			}

			// Needed to check whether thumb and mouse overlap after shield removed
			if (isMouseInElement(e, thumb)) {
				thumbHover = true;
			}
		}

		currentThumb = null as any;
	}

	// Check if mouse event cords overlay with an element's area
	function isMouseInElement(event: any, element: any) {
		let rect = element.getBoundingClientRect();
		let { clientX: x, clientY: y } = event;

		return x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom ? false : true;
	}

	// Accessible keypress handling
	function onKeyPress(e: KeyboardEvent) {
		// Max out at +/- 10 to value per event (50 events / 5)
		// 100 below is to increase the amount of events required to reach max velocity
		if (keydownAcceleration < 50) {
			keydownAcceleration++;
		}

		let throttled = Math.ceil(keydownAcceleration / 5);

		if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
			if (value + throttled > max || value >= max) {
				setValue(max);
			} else {
				setValue(value + throttled);
			}
		}

		if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
			if (value - throttled < min || value <= min) {
				setValue(min);
			} else {
				setValue(value - throttled);
			}
		}

		// Reset acceleration after 100ms of no events
		clearTimeout(accelerationTimer);
		accelerationTimer = setTimeout(() => (keydownAcceleration = 1), 100);
	}

	function calculateNewValue(clientX: number) {
		// Find distance between cursor and element's left cord (20px / 2 = 10px) - Center of thumb
		let delta = clientX - (elementX + 10);

		// Use width of the container minus (5px * 2 sides) offset for percent calc
		let percent = (delta * 100) / (container.clientWidth - 10);

		// Limit percent 0 -> 100
		percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;

		// Limit value min -> max
		setValue(parseInt(((percent * (max - min)) / 100) as any) + min);
	}

	// Handles both dragging of touch/mouse as well as simple one-off click/touches
	function updateValueOnEvent(e: any) {
		// touchstart && mousedown are one-off updates, otherwise expect a currentPointer node
		if (!currentThumb && e.type !== 'touchstart' && e.type !== 'mousedown') {
			return false;
		}

		e.stopPropagation?.();
		e.preventDefault?.();

		// Get client's x cord either touch or mouse
		const clientX =
			e.type === 'touchmove' || e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;

		calculateNewValue(clientX);
	}

	// React to left position of element relative to window
	$: if (element) {
		elementX = element.getBoundingClientRect().left;
	}

	// Set a class based on if dragging
	$: active = !!currentThumb;

	// Update progressbar and thumb styles to represent value
	$: if (progressBar && thumb) {
		// Limit value min -> max
		value = value > min ? value : min;
		value = value < max ? value : max;

		let percent = ((value - min) * 100) / (max - min);
		let offsetLeft = (container.clientWidth - 10) * (percent / 100) + 5;

		// Update thumb position + active range track width
		thumb.style.left = `${offsetLeft}px`;
		progressBar.style.width = `${offsetLeft}px`;
	}
</script>

<svelte:window
	on:touchmove|nonpassive={updateValueOnEvent}
	on:mousemove={updateValueOnEvent}
	on:touchcancel={onDragEnd}
	on:touchend={onDragEnd}
	on:mouseup={onDragEnd}
	on:resize={resizeWindow}
/>

<div class="range" class:active>
	<div
		class="inner"
		tabindex="0"
		role="slider"
		aria-valuemin={min}
		aria-valuemax={max}
		aria-valuenow={value}
		bind:this={element}
		on:keydown={onKeyPress}
		on:mousedown={onTrackEvent}
		on:touchstart={onTrackEvent}
	>
		<div class="track" bind:this={container}>
			<div class="progress" bind:this={progressBar} />

			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				class="thumb"
				bind:this={thumb}
				on:touchstart={onDragStart}
				on:mousedown={onDragStart}
				on:mouseover={() => (thumbHover = true)}
				on:mouseout={() => (thumbHover = false)}
			>
				{#if active || thumbHover}
					<div class="tooltip" in:fly={{ y: 7, duration: 200 }} out:fade={{ duration: 100 }}>
						{toMinutes(value)}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<style>
		.mouse-over-shield {
			position: fixed;
			top: 0px;
			left: 0px;
			height: 100%;
			width: 100%;
			background-color: rgba(255, 0, 0, 0);
			z-index: 10000;
			cursor: grabbing;
		}
	</style>
</svelte:head>

<style lang="scss">
	.range {
		position: relative;
		flex: 1;
		height: 22px;

		.inner {
			min-width: 100%;
			position: relative;
			padding: 0.5rem;
			box-sizing: border-box;
			outline: none;

			.track {
				height: 4px;
				background-color: var(--track-bgcolor, #d0d0d0);
				border-radius: 999px;
			}

			.progress {
				background-color: var(--track-highlight-bgcolor, #6185ff);
				background: var(--track-highlight-bg, linear-gradient(90deg, #6185ff, #9c65ff));
				width: 0;
				height: 4px;
				position: absolute;
				border-radius: 999px;
			}

			.thumb {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				width: 12px;
				height: 12px;
				background-color: var(--thumb-bgcolor, white);
				cursor: pointer;
				border-radius: 999px;
				margin-top: -4px;
				transition: box-shadow 100ms;
				user-select: none;
				box-shadow: var(
					--thumb-boxshadow,
					0 1px 1px 0 rgba(0, 0, 0, 0.14),
					0 0px 2px 1px rgba(0, 0, 0, 0.2)
				);

				transition: all 0.15s ease-in-out;

				.tooltip {
					pointer-events: none;
					position: absolute;
					top: -33px;
					color: var(--tooltip-text, white);
					width: 38px;
					padding: 4px 0;
					border-radius: 4px;
					text-align: center;
					background-color: var(--tooltip-bgcolor, #6185ff);
					background: var(--tooltip-bg, linear-gradient(45deg, #6185ff, #9c65ff));

					&::after {
						content: '';
						display: block;
						position: absolute;
						height: 7px;
						width: 7px;
						background-color: var(--tooltip-bgcolor, #6185ff);
						bottom: -3px;
						left: calc(50% - 3px);
						clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
						transform: rotate(-45deg);
						border-radius: 0 0 0 3px;
					}
				}
			}

			&:focus-visible > .track {
				box-shadow: 0 0 0 2px white, 0 0 0 3px var(--track-focus, #6185ff);
			}
		}

		&.active {
			.track {
				height: 6px;
			}

			.progress {
				height: 6px;
			}

			.thumb {
				width: 24px;
				height: 24px;
				margin-top: -8px;
				box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 2px 1px rgba(0, 0, 0, 0.2),
					0 0 0 6px var(--thumb-holding-outline, rgba(113, 119, 250, 0.3));
			}
		}
	}
</style>
