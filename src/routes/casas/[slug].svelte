<script>
	import Cover from '../../components/Cover.svelte'
	import Card from '../../components/Card.svelte'
	import { publish } from "../../support/events"

	export let places = []
	export let slug = ''

	publish('update_menu', slug)

	const categoryTitle = {
		playas: 'Casas en Venta en Playas de Tijuana',
		centro: 'Casas en Venta en el Centro, Tijuana',
		rio: 'Casas en Venta en Zona Rio, Tijuana',
		otay: 'Casas en Venta en Zona Otay, Tijuana',
		cacho: 'Casas en Venta en la Cacho, Tijuana',
		lago: 'Casas en Venta en El Lago, Tijuana',
		depa: 'Departamentos en Venta, Tijuana',
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
	ul {
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 40px 0;
	}
</style>

<svelte:head>
	<title>Las mejores {categoryTitle[slug]} | {currentMonthTitle} 2022</title>
	<meta property="og:title" content={categoryTitle[slug]}>
	<meta property="og:description" content={description}>
	<meta name="description" content={description}>
</svelte:head>


<Cover title={categoryTitle[slug]} />

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
