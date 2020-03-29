<script>
  import { createEventDispatcher } from 'svelte';

  export let minPrice = '';
  export let maxPrice = '';
  export let keyword = '';
  export let city = 'tijuana'

  const dispatch = createEventDispatcher();

  async function handleSubmit(event) {
    event.preventDefault();

    const filters = {
      minPrice,
      maxPrice,
      keyword,
      city
    }

    dispatch('filters', filters);
  }
</script>

<form on:submit={handleSubmit}>
  <ul>
    <li>
      <span>Mínimo</span>
      <input
        bind:value={minPrice}
      />
    </li>
    <li>
      <span>Máximo</span>
      <input
        bind:value={maxPrice}
      />
    </li>
    <li>
      <span>Término</span>
      <input
        bind:value={keyword}
      />
    </li>
    <li>
      <span>Ciudad</span>
      <input
        bind:value={city}
      />
    </li>
    <li>
      <input type="submit" value="Buscar" />
    </li>
  </ul>
</form>

<style>
  ul {
    background: white;
    list-style-type: none;
    margin: 0;
    padding: 0 12px;
    font-size: 22px;
  }
  li {
    display: flex;
    align-items: flex-end;
  }
  li:last-child {
    flex-direction: row-reverse;
    margin: 6px 0;
  }
  input[type="submit"] {
    border: 1px dotted black;
    background: none;
  }
  span {
    color: #333;
    flex: 1;
    margin: auto 0;
  }
  input {
    flex: 4;
    font-size: 22px;
    border: none;
    border-bottom: 1px dotted black;
    padding: 10px;
  }
</style>
