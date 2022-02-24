<script>
	import Lazy from 'svelte-lazy';

	export let places
	const title = 'Casas en Venta en Tijuana - Comprar Casa.'
	const description = 'Encuentra casas en venta en Tijuana, Baja California. La Casa Ideal para Comprar te espera.'
</script>

<script context="module">
	export async function preload() {
		const url = `process.env.API_URL/places`
		const response = await this.fetch(url)
		const places = await response.json()

		return {
			places
		}
	}
</script>

<style>
	.item {
		margin-bottom: 52px;
	}

	.image-container {
		margin: 0 auto;
		width: 100%;
	}
	img {
		width: 100%;
		height: 300px;
		object-fit: contain;
	}

	.content {
		padding: 12px;
	}

	a {
		text-decoration: none;
	}

	@media (max-width: 480px) {
		h1 {
			padding: 222px 0;
			background-color: #000;
			color: #FFF;
			text-align: center;
			margin-bottom: 20px;
		}
		.item {
			display: block;
		}
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.comprarcasatijuana.com/banner.webp">
	<meta property="og:url" content="https://www.comprarcasatijuana.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<h1>{title}</h1>

{#each places as place, index}
<div class="item"
	data-source={place.source}
	data-date={place.createdAt}>
	<div class="content">
		<h2>{index + 1} - <a href={place.url} target="_blank" rel="nofollow noreferrer">{place.title}</a></h2>
	</div>
	<div class="image-container">
		<Lazy height={300}>
			<img src={place.images[0]} alt={place.title}>
		</Lazy>
	</div>
	<div class="content">
		<div class="description">{place.description}</div>
		<div>{new Intl.NumberFormat().format(place.price)} {place.currency}</div>
		<p>
			Casa en Venta en {place.source}
		</p>
	</div>
</div>
{/each}

<p>
	{description}
</p>
