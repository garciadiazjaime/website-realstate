<script>
	import ApolloClient from 'apollo-boost';
	import { InMemoryCache } from 'apollo-cache-inmemory';
	import { query } from 'svelte-apollo';
	import gql from 'graphql-tag';
	
	import Header from './Header.svelte';
	import Card from './Card.svelte';
	import Filters from './Filters.svelte';	

	const cache = new InMemoryCache({
		addTypename: false
	});

  const client = new ApolloClient({ uri: 'http://localhost:3030/real-state/place' , cache });

	function getPlacesQuery(filters = {}) {
		const { minPrice, maxPrice, keyword } = filters;

		return gql`
				query RealState {
					places(
						first: 100
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

	const filters = JSON.parse(
    window.localStorage.getItem('filters') || '{}'
  );

	let places = query(client, { query: getPlacesQuery(filters) });
	
	async function search(event) {
		const { detail: filters } = event

		window.localStorage.setItem('filters', JSON.stringify(filters));
    places = await query(client, {
      query: getPlacesQuery(filters)
    });
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
{#await $places}
	<li>Buscando...</li>
{:then result}
	{#each result.data.places as place}
		<li><Card {...place} formatter={formatter} /></li>
	{:else}
		<li>No se encontraron lugares :(</li>
	{/each}
{:catch error}
	{error}
{/await}
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
