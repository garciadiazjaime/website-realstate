<script>
	import { publish, subscribe } from "../support/events"
	export let segment;

	subscribe('update_menu', (path) => {
		segment = path
	})

	function clickHandler() {
		publish('update_menu', this.attributes.href.value.split('/').pop())
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href="." on:click={clickHandler}>Casas</a></li>
		<li><a aria-current="{segment === 'playas' ? 'page' : undefined}" href="casas/playas" on:click={clickHandler}>Playas</a></li>
		<li><a aria-current="{segment === 'centro' ? 'page' : undefined}" href="casas/centro" on:click={clickHandler}>Centro</a></li>
		<li><a aria-current="{segment === 'rio' ? 'page' : undefined}" href="casas/rio" on:click={clickHandler}>Zona Rio</a></li>
		<li><a aria-current="{segment === 'otay' ? 'page' : undefined}" href="casas/otay" on:click={clickHandler}>Otay</a></li>
		<li><a aria-current="{segment === 'cacho' ? 'page' : undefined}" href="casas/cacho" on:click={clickHandler}>Cacho</a></li>
		<li><a aria-current="{segment === 'lago' ? 'page' : undefined}" href="casas/lago" on:click={clickHandler}>El Lago</a></li>
		<li><a aria-current="{segment === 'depa' ? 'page' : undefined}" href="casas/depa" on:click={clickHandler}>Departamentos</a></li>
	</ul>
</nav>
