import { useEffect, useState } from "react"
import ScoreBoard from "./components/ScoreBoard";
import Card from "./components/Card";



function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState([]);


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
    "greninja",
    "gyarados",
    "dragonite",
    "jigglypuff",
    "meowth",
    "psyduck",
    "blastoise"
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
  }, []);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function handleClick(id) {
    if (!clicked.includes(id)) {
      setScore(score + 1);
      setClicked(prev => [...prev, id]);
    } else {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setClicked([]);
    }
    setData(shuffle(data));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main">
      <ScoreBoard score={score} highScore={highScore} />
      <div className="pokemon-grid">
        {data.map((pokemon) => (
          <Card onClick={() => handleClick(pokemon.id)} key={pokemon.id} img={pokemon.sprites.front_default} />
        ))}
      </div>
    </div>
  );
}

export default App;