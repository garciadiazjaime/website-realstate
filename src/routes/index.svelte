<script>
	import Lazy from 'svelte-lazy';

	export let places
	const title = 'Casas en Venta en Tijuana - Baja California'
	const description = 'Encuentra casas en venta en Tijuana, Baja California. La Casa Ideal para Comprar te espera.'
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

	.image-container {
		width: 400px;
		overflow: hidden;
	}
	img {
		width: 400px;
		height: 400px;
		display: block;
		background-repeat: no-repeat;
		background-size: cover;
		transition: transform .2s;
	}

	.content {
		padding: 12px;
		flex: 400px;
	}
	.description {
		margin-bottom: 12px;
	}

	a {
		text-decoration: none;
	}

	@media (max-width: 480px) {
		h1 {
			padding: 230px 12px;
			margin: 0;
			background-color: #000;
			color: #FFF;
			text-align: center;
		}
		.item {
			display: block;
		}
		.image-container {
			height: 400px;
			width: 100%;
		}
		img {
			width: 100%;
			height: 400px;
		}
	}
</style>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title}>
	<meta property="og:description" content={description}>
	<meta property="og:image" content="https://www.comprarcasatijuana.com/banner.png">
	<meta property="og:url" content="https://www.comprarcasatijuana.com/">
	<meta name="description" content={description}>
	<link href="https://www.google-analytics.com" rel="dns-prefetch">
</svelte:head>

<h1>{title}</h1>

{#each places as place}
<div class="item"
	data-source={place.source}
	data-date={place.createdAt}>
	<div class="image-container">
		<Lazy height={300}>
			<img src={place.images[0]} alt={place.title}>
		</Lazy>
	</div>
	<div class="content">
		<h2>{place.title}</h2>
		<div class="description">{place.description}</div>
		<div>{new Intl.NumberFormat().format(place.price)} {place.currency}</div>
		<p>
			<a href={place.url} target="_blank" rel="nofollow noreferrer">Más información sobre Casa en Venta</a>
		</p>
	</div>
</div>
{/each}

<footer>
	<p>
		{description}
	</p>
	Proyecto en Colaboración con: <br />
	<a href="https://www.garitacenter.com/">Reporte de Garitas | Linea Tijuana / San Ysidro - Otay</a>
	<br />
	<a href="https://www.feedmetj.com/">¿Qué comer en Tijuana?</a>
	<br />
	<a href="http://www.playami.com">¿Qué comer en Playas de Tijuana?</a>
	<br />
	<a href="https://www.noticiasmexico.org/">Últimas Noticias de México</a>
	<br />
	<a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
</footer>
