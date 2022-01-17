<script>
	import { onMount } from 'svelte';

	export let places
	let Lazy;

	onMount(async () => {
		const module = await import('svelte-lazy');
		Lazy = module.default;
	});

	function itemClickHandler(url) {
		window.open(url, "new_blank")
	}
</script>

<script context="module">
	export async function preload() {
		const response = await this.fetch('/places.json');
		const places = await response.json();

		return {
			places
		}
	}
</script>

<style>
	.item {
		margin-bottom: 52px;
		display: flex;
	}
	.item:hover {
		cursor: pointer;
		box-shadow: -3px 3px 3px 3px #EEE;
	}

	.image-container {
		width: 400px;
	}
	.image {
		width: 400px;
		height: 400px;
		display: block;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.content {
		padding: 12px;
		flex: 400px;
	}
	.description {
		margin-bottom: 12px;
	}

	@media (max-width: 480px) {
		.item {
			display: block;
		}
		.image-container {
			height: 400px;
			width: 100%;
		}
		.image {
			width: 100%;
			height: 400px;
		}
	}
</style>

<svelte:head>
	<title>Real State | Tijuana</title>
</svelte:head>

{#each places as place}
<div class="item"
	on:click={() => itemClickHandler(place.url)}
	data-source={place.source}
	data-date={place.createdAt}>
	<div class="image-container">
		<svelte:component this={Lazy} height={300}>
			<div class="image" style={`background-image: url(${place.images[0]})`}></div>
		</svelte:component>
	</div>
	<div class="content">
		<h2>{place.title}</h2>
		<div class="description">{place.description}</div>
		<h3>{place.address}</h3>
		<div>{new Intl.NumberFormat().format(place.price)} {place.currency}</div>
	</div>
</div>
{/each}
