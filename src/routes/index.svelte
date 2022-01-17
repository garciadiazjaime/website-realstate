<script>
	import { onMount } from 'svelte';

	export let places
	let Lazy;

	onMount(async () => {
		const module = await import('svelte-lazy');
		Lazy = module.default;
	});
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
	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}
</style>

<svelte:head>
	<title>Real State | Tijuana</title>
</svelte:head>

{#each places as place}
<div>
	<svelte:component this={Lazy} height={300}>
		<img src={place.images[0]} alt="">
	</svelte:component>
	<h2>{place.title}</h2>
	<div>{place.description}</div>
	<div>{place.address}</div>
	<div>{place.price} {place.currency}</div>
	<a href={place.url} target="_blank">ver</a>
	<div>{place.source}</div>
	<div>{place.createdAt}</div>
</div>
{/each}
