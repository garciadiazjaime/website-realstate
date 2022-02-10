<script>
	import Lazy from 'svelte-lazy';

	export let places
	const title = 'Casas en Venta en Tijuana - Comprar Casa.'
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
	<div class="content">
		<h2>{place.title}</h2>
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
			<a href={place.url} target="_blank" rel="nofollow noreferrer">Casa en Venta en {place.source}</a>
		</p>
	</div>
</div>
{/each}

<footer>
	<p>
		Comprar Casas en Tijuana, tiene como objectivo dar a conocer las últimas publicaciones que los diferentes
		sitios de bienes y raices han subido a sus sitios.
		La intención es tenerte informado sobre Casas en Venta en Tijuana a través de una plataforma rápida y amigable.
	</p>
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
	<br />
	<a href="http://www.larutadelvinoensenada.com/">La Ruta del Vino Ensenada</a>
</footer>
