import { useEffect, useState } from "react"
import ScoreBoard from "./components/ScoreBoard";
import Card from "./components/Card";



function App() {
  const [score, setScore] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pokemonNames = [
    "pikachu",
    "charizard",
    "bulbasaur",
    "squirtle",
    "eevee",
    "mewtwo",
    "gengar",
    "snorlax",
    "lucario",
    "greninja"
  ];

  useEffect(() => {
    async function getPokemon() {
      try {
        setLoading(true);

        const pokemonData = await Promise.all(
          pokemonNames.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) throw new Error(`Could not find ${name}`);
            return res.json();
          })
        );

        setData(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getPokemon();
  }, []); // empty array = run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main">
      <ScoreBoard />
      <div className="pokemon-grid">
        {data.map((pokemon) => (
          <Card key={pokemon.id} img={pokemon.sprites.front_default} />
        ))}
      </div>
    </div>
  );
}

export default App;