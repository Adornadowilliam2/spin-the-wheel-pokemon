import React, { useState, useEffect } from 'react';
import { Roulette } from 'react-custom-roulette';  // Import the Roulette component from react-custom-roulette
import 'react-custom-roulette/dist/index.css';  // Import the required CSS
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import logo from "../public/logo.png";

const fetchPokemonData = async () => {
  try {
    const response = await fetch("https://heroku-azure.vercel.app/api/user");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
    };

    getPokemonData();
  }, []);

  const pokemonNames = pokemonData.map(pokemon => pokemon.name);
  const pokemonImages = pokemonData.map(pokemon => pokemon.image);

  const handleSpinFinish = (item) => {
    const index = pokemonNames.indexOf(item);
    const pokemonImage = pokemonImages[index];

    toast.info(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={pokemonImage}
          alt={item}
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <span>You got {item}!</span>
      </div>,
    );
  };

  // Prepare the data for the roulette wheel
  const rouletteData = pokemonNames.map(name => ({
    option: name,  // The name of the Pokémon
    style: { backgroundColor: '#fff', color: '#000' }  // Customize the style if you want
  }));

  return (
    <div>
      {pokemonNames.length > 0 ? (
        <>
          <Roulette
            options={rouletteData}  // Pass the options to the roulette wheel
            onComplete={handleSpinFinish}  // Event handler after the spin finishes
            buttonText="Spin!"  // Customize the button text
            buttonStyle={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}  // Button styling
          />
          <img src={logo} alt="pokemon logo" className='block m-auto' />
        </>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
      <ToastContainer />  {/* Toast container to render the toast notifications */}
    </div>
  );
}

export default App;
