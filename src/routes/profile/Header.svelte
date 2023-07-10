<script lang="ts">
	import User from '$icons/User.svelte';
	import { user, hasPaidSubscription } from '$stores/user';
</script>

<header>
	<div class="avatar">
		<User />
	</div>

	<div class="info">
		<h1>{$user?.name || $user?.email}</h1>
		<p>{$hasPaidSubscription ? "Платен абонамент" : "Безплатна версия"}</p>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;

		.avatar {
			height: 70px;
			width: 70px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			background-color: var(--background-color-2);
			margin-right: 16px;
			flex: 0 0 70px;
		}

		.info {
			flex: 0 1 auto;
			overflow: hidden;
			text-align: left;

			h1 {
				color: var(--text-color-1);
				margin: 0;
				font-size: 18px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			p {
				color: var(--action-color-1);
				margin: 4px 0 0;
				font-size: 14px;
			}
		}

		:global(svg) {
			height: 30px;
			fill: var(--text-color-1);
		}
	}
</style>
