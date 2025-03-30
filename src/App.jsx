import React, { useState, useEffect } from 'react';
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
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
      
      // Load images from localStorage if available
      const savedImages = JSON.parse(localStorage.getItem('pokemonImages')) || [];
      if (savedImages.length > 0) {
        console.log("Loaded saved Pokémon images from localStorage", savedImages);
      }
    };

    getPokemonData();
  }, []);

  const handleGetPokemon = () => {
    
    const randomIndex = Math.floor(Math.random() * pokemonData.length);
    const pokemon = pokemonData[randomIndex];
    setSelectedPokemon(pokemon);

  
    const savedImages = JSON.parse(localStorage.getItem('pokemonImages')) || [];
    if (!savedImages.includes(pokemon.image)) {
      savedImages.push(pokemon.image);
      localStorage.setItem('pokemonImages', JSON.stringify(savedImages));
    }

    
    toast.info(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <span>You got {pokemon.name}!</span>
      </div>,
    );
  };

  return (
    <div style={{padding:"30px"}}>
      <img src={logo} alt="pokemon logo" className='block m-auto' />
      
      {pokemonData.length > 0 ? (
        <>
          <button 
            onClick={handleGetPokemon} 
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', margin:"auto", display:'block' }}
          >
            Get Pokémon!
          </button>

          {selectedPokemon && (
            <div 
              style={{
                marginTop: '20px', 
                padding: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '10px', 
                textAlign: 'center', 
                maxWidth: '200px', 
                margin: '20px auto'
              }}
            >
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                style={{ width: '100px', height: '100px' ,display:'block',margin:'auto'
                }}
              />
              <h3>{selectedPokemon.name}</h3>
            </div>
          )}
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Loading Pokémon data...</p>
      )}

      <ToastContainer />  
    </div>
  );
}

export default App;
