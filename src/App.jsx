import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonShown, setPokemonShown] = useState(null);

  async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const data = await response.json();
    return data.results;
  }

  async function setPokemonsOnState() {
    const body = await fetchPokemons();
    console.log(body);
    setPokemon(body);
  }

  const showDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPokemonShown(data);
  };

  useEffect(() => {
    setPokemonsOnState();
  }, []);

  /*   if (pokemon.length === 0) {
    setPokemonsOnState();
  } */

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {pokemon.map((poke) => (
            <li key={poke.name} className="pokeList">
              <span>{poke.name}</span>
              <button onClick={() => showDetails(poke.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div>
          <h2 id={`${pokemonShown.name}`}>{pokemonShown.name}</h2>
          <img src={pokemonShown.sprites.front_default} alt="" />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>
            {pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>
            {pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
