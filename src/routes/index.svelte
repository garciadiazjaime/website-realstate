<script>
	import Lazy from 'svelte-lazy';

	export let places

	const title = 'Casas en Venta en Tijuana | Encuentra y Compra tu Casa.'
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
	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 40px 0;
	}

	img {
		height: 454px;
		width: 100%;
		object-fit: cover;
	}

	.cover {
		padding: 220px 0;
		background-color: #f77670;
		color: white;
		text-align: center;	
	}

	h2, h3, p {
		padding: 0 12px;
	}

	a {
		text-decoration: none;
	}

	small {
		height: 24px;
		width: 24px;
		background-color: #f77670;
		color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		font-weight: bold;
		margin-left: 12px;
	}

	p {
		word-break: break-word;
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.comprarcasatijuana.com/banner.webp">
	<meta property="og:url" content="https://www.comprarcasatijuana.com/">
	<meta name="description" content={description}>
	<link rel="apple-touch-icon" href="/logo-192.webp" />
</svelte:head>

<div class="cover">
	<h1>Casas en Venta en Tijuana</h1>
	<h2>Compra tu Casa</h2>
</div>

<ul>
	{#each places as place, index}
	<li>
		<small>{index+1}</small>
		<h2><a href={place.url} target="_blank" rel="nofollow noreferrer">{place.title}</a></h2>
		<h3>Casa en Venta en {place.source}</h3>
		<Lazy height={300}>
			<img src={place.images[0]} alt={place.title}>
		</Lazy>
		<p>{place.description}</p>
		<p>{new Intl.NumberFormat().format(place.price)} {place.currency}</p>
	</li>
	{/each}
</ul>

<p>
	{description}
</p>
