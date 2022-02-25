<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 1280px;
		background-color: white;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 12px;
	}

	@media (max-width: 480px) {
		main {
			font-size: 1.2em;
			padding: 0;
		}
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<footer>
	<p>
		Comprar Casas en Tijuana, tiene como objectivo dar a conocer las últimas publicaciones que los diferentes
		sitios de bienes y raices han subido a sus sitios.
		La intención es tenerte informado sobre Casas en Venta en Tijuana a través de una plataforma rápida y amigable.
	</p>

	<div>
		Síguenos en
		<ul>
			<li><a href="https://www.instagram.com/comprarcasatijuana/" target="_blank" title="Casas en Venta en Tijuana - Baja California">Instagram</a></li>
		</ul>
	</div>

	Proyecto en Colaboración con: <br />
	<a href="https://www.garitacenter.com/">Reporte de Garitas | Linea Tijuana / San Ysidro - Otay</a>
	<br />
	<a href="https://www.feedmetj.com/">Restaurantes en Tijuana</a>
	<br />
	<a href="https://www.playami.com/">Restaurantes en Playas de Tijuana</a>
	<br />
	<a href="https://www.noticiasmexico.org/">Últimas Noticias de México</a>
	<br />
	<a href="https://www.mintitmedia.com/">Desarrollo Web en Tijuana</a>
	<br />
	<a href="https://www.larutadelvinoensenada.com/">La Ruta del Vino Ensenada</a>
</footer>

