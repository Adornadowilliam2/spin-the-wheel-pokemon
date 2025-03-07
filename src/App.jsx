import React, { useState, useEffect } from 'react';
import { SpinWheel } from 'react-spin-wheel';
import 'react-spin-wheel/dist/index.css'; 
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  


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

  return (
    <div>
      {pokemonNames.length > 0 ? (
        <>
          <SpinWheel
            items={pokemonNames}  
            onFinishSpin={handleSpinFinish}  
          />
          <img src="./public/logo.png" alt="pokemon logo" className='block m-auto' />
        </>
      ) : (
        <p>Loading Pokémon data...</p>
      )}
      <ToastContainer />  {/* Toast container to render the toast notifications */}
    </div>
  );
}

export default App;
