<script>
	export let places
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
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Real State | Tijuana</title>
</svelte:head>

{#each places as place}
<div>
	<img src={place.images[0]} alt="">
	<h2>{place.title}</h2>
	<div>{place.description}</div>
	<div>{place.address}</div>
	<div>{place.price} {place.currency}</div>
	<a href={place.url} target="_blank">ver</a>
	<div>{place.source}</div>
</div>
{/each}
