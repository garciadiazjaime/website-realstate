<script>
	import Lazy from 'svelte-lazy';

	export let places

	function itemClickHandler(url) {
		window.open(url, "new_blank")
	}
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
	.item:hover {
		cursor: pointer;
		box-shadow: -3px 3px 3px 3px #EEE;
	}

	.image-container {
		width: 400px;
		overflow: hidden;
	}
	.image {
		width: 400px;
		height: 400px;
		display: block;
		background-repeat: no-repeat;
		background-size: cover;
		transition: transform .2s;
	}
	.image:hover {
		transform: scale(1.1);
	}

	.content {
		padding: 12px;
		flex: 400px;
	}
	.description {
		margin-bottom: 12px;
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
		.image {
			width: 100%;
			height: 400px;
		}
	}
</style>

<svelte:head>
	<title>Real State | Tijuana</title>
</svelte:head>

<h1>Comprar Casa en Tijuana</h1>

{#each places as place}
<div class="item"
	on:click={() => itemClickHandler(place.url)}
	data-source={place.source}
	data-date={place.createdAt}>
	<div class="image-container">
		<Lazy height={300}>
			<div class="image" style={`background-image: url(${place.images[0]})`}></div>
		</Lazy>
	</div>
	<div class="content">
		<h2>{place.title}</h2>
		<div class="description">{place.description}</div>
		<h3>{place.address}</h3>
		<div>{new Intl.NumberFormat().format(place.price)} {place.currency}</div>
	</div>
</div>
{/each}

<footer>
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
