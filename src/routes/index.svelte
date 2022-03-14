<script>
	import Cover from '../components/Cover.svelte'
	import Card from '../components/Card.svelte'
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

<Cover title="Casas en Venta en Tijuana" />

<ul>
	{#each places as place, index}
	<li>
		<Card
			index={index+1}
			link={place.url}
			title={place.title}
			subtitle={`Casa en Venta en ${place.source}`}
			image={place.images[0]}
			description={place.description}
			price={`${new Intl.NumberFormat().format(place.price)} ${place.currency}`}
		/>
	</li>
	{/each}
</ul>

<p>
	{description}
</p>
