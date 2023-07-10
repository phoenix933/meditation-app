<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="container">
	<div class="loading" out:fade|local={{ duration: 300 }}>
		<div class="set-one">
			<div class="circle" />
			<div class="circle" />
		</div>
		<div class="set-two">
			<div class="circle" />
			<div class="circle" />
		</div>
	</div>
	<h1>Masterpeace</h1>
</div>

<style lang="scss">
	.container {
		background-color: var(--background-color-1);
		height: 100vh;
		position: relative;
		z-index: 20;

		h1 {
			position: absolute;
			bottom: 16px;
			width: 100%;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 10px;
			font-size: 24px;
			font-weight: 300;
			color: var(--text-color-1);
		}
	}

	.loading {
		width: 100%;
		height: 100%;

		.circle {
			width: 25px;
			height: 25px;
			position: absolute;
			background: var(--action-color-1);
			border-radius: 50%;
			margin: -12.5px;
			-webkit-animation: mesh 3s ease-in-out infinite;
			animation: mesh 3s ease-in-out infinite -1.5s;
		}

		> div {
			position: absolute;
			top: 50%;
			left: 50%;

			&:last-child {
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
			}

			.circle:last-child {
				-webkit-animation-delay: 0s;
				animation-delay: 0s;
			}
		}
	}

	@-webkit-keyframes mesh {
		0% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}
		50% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
		50.00001% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes mesh {
		0% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(0);
			transform: rotate(0);
		}
		50% {
			-webkit-transform-origin: 50% -100%;
			transform-origin: 50% -100%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
		50.00001% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform-origin: 50% 200%;
			transform-origin: 50% 200%;
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
