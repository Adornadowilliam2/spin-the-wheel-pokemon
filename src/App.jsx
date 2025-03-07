import React, { useState, useEffect } from 'react';
import { SpinWheel } from 'react-spin-wheel';
import 'react-spin-wheel/dist/index.css'; // Import necessary CSS for the wheel

// Function to fetch Pokémon data
const fetchPokemonData = async () => {
  try {
    const response = await fetch("https://heroku-azure.vercel.app/api/user");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch Pokémon data once the component mounts
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
    };

    getPokemonData();
  }, []);

  // If Pokémon data is available, prepare the items for the SpinWheel
  const pokemonNames = pokemonData.map(pokemon => pokemon.name);

  return (
    <div>
      <h1>Spin the Wheel: Get Your Pokémon!</h1>
      {pokemonNames.length > 0 ? (
        <SpinWheel
          items={pokemonNames}  // Pass Pokémon names as the items in the wheel
          onFinishSpin={(item) => {
            alert(`You got ${item}!`);  // Display the chosen Pokémon on spin finish
          }}
        />
      ) : (
        <p>Loading Pokémon data...</p>
      )}
    </div>
  );
}

export default App;
