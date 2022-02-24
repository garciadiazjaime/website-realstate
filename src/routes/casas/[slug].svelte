<script>
	import Lazy from 'svelte-lazy';
	import { publish } from "../../support/events"

	export let places = []
	export let slug = ''

	publish('update_menu', slug)

	const categoryTitle = {
		playas: 'Casas en Venta en Playas de Tijuana',
		centro: 'Casas en Venta en el Centro, Tijuana',
		rio: 'Casas en Venta en Zona Rio, Tijuana',
		otay: 'Casas en Venta en Zona Otay, Tijuana',
	}

	const description = `Las mejores ${categoryTitle[slug]}. Encuentra tu casa.`
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	const currentMonthTitle = months[new Date().getMonth()]
	
</script>

<script context="module">
	export async function preload(page) {
		const { slug } = page.params;
		const url = `process.env.API_URL/places?slug=${slug}`
		const response = await this.fetch(url)
		const places = await response.json()

		return { 
			places,
			slug 
		};
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
	<title>Las mejores {categoryTitle[slug]} | {currentMonthTitle} 2022</title>
	<meta property="og:title" content="feedmetj">
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.comprarcasatijuana.com/banner.webp">
	<meta property="og:url" content="https://www.comprarcasatijuana.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">

	<link rel="apple-touch-icon" href="/logo-192.webp" />
</svelte:head>


<section>
	<h1>{categoryTitle[slug]}</h1>

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
</section>
