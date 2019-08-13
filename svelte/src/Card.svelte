<script>
  export let url;
	export let images;
	export let price;
  export let currency;
  export let description;
  export let address;
  export let formatter

  const observer = new IntersectionObserver(entries => {
		for (let i = 0; i < entries.length; i += 1) {
			const entry = entries[i];
			if (entry.isIntersecting) {
        entry.target.style.backgroundImage = `url('${entry.target.dataset.src}')`
				observer.unobserve(entry.target);
			}
		}
	}, {
		rootMargin: '100px 0px'
	});

	function lazy(node) {
		observer.observe(node);
		
		return {
			destroy() {
				observer.unobserve(node);
			}	
		}
	}
</script>

<a href={url} target="blank" rel="nofollow">
  <span use:lazy data-src={images[0]}></span>
  <p>
    <strong>{formatter.format(price)} {currency}</strong>
  </p>
  <p class="description">{description}</p>
  <p class="address">{address}</p>
</a>


<style>
  a {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 420px;
    background: white;
    text-decoration: none;
    color: #3b4144;
  }

  p {
    padding: 12px;
  }

  span {
    display: block;
    height: 250px;
    background-size: cover;
  }

  .description {
    height: 410px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .address {
    color: #869099;
  }

  strong {
    font-size: 1.4em;
  }

  @media(min-width: 420px){
    span {
      width: 420px;
    }
  }
</style>
