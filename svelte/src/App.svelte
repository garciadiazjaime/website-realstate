<script>
	import { onMount } from 'svelte';

	import Header from './Header.svelte';
	import Card from './Card.svelte';
	import Filters from './Filters.svelte';	

	const API_URL = `http://${
  // eslint-disable-next-line no-undef
  ENVIRONMENT !== "production"
    ? "0.0.0.0:3030"
    : "api.mintitmedia.com"
}/real-state/graphiql`;

	function getPlacesQuery(filters = {}) {
		const { minPrice, maxPrice, keyword, city = 'tijuana' } = filters;

		return `
				query RealState {
					places(
						first: 100
						city: "${city}"
						${minPrice ? `minPrice: ${minPrice}` : ""}
						${maxPrice ? `maxPrice: ${maxPrice}` : ""}
						${keyword ? `keyword: "${keyword}"` : ""}
					) {
						price
						currency
						description
						images
						url
						address
					}
				}
			`;
	}

	let filters = {}

	let places = []

	async function getPlaces(filters) {
		const payload = {
			query: getPlacesQuery(filters)
		}

		const result = await fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers:{
				'Content-Type': 'application/json'
			}
		})
		const { data: { places } } = await result.json()

		return places
	}

	onMount(async () => {
		filters = JSON.parse(window.localStorage.getItem('filters') || '{}');
		places = await getPlaces(filters)
	})
	
	async function search(event) {
		const { detail: filters } = event

		window.localStorage.setItem('filters', JSON.stringify(filters));

		places = await getPlaces(filters)
	}

	const formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: 'USD',
    minimumFractionDigits: 0
	});
</script>

<svelte:head>
  <title>Propiedades a la Venta en Tijuana, México</title>
</svelte:head>

<Header />
<Filters on:filters={search} {...filters} />

<ul>
	{#each places as place}
		<li><Card {...place} formatter={formatter} /></li>
	{/each}
</ul>

<style>
	:global(body) {
		padding: 0;
		font-size: 18px;
		margin: 0;
	}
	:global(p) {
		margin: 0;
	}

  ul {
    background: #e8e9ea;
    list-style-type: none;
    padding: 6px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		justify-content: space-evenly;
  }

  li {
    padding: 6px 0;
  }
</style>
