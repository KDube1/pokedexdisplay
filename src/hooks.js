import {useState} from "react";

export default function usePokemonInfo(){
    const [pokedexEntry, setPokedexEntry] = useState(undefined);

    async function getPokemonURL(number){
        let url = "https://pokeapi.co/api/v2/pokemon/"
        url = url + number;

        const response = await fetch(url);

        const jsonResponse = await response.json();

        let obj ={
            sprite:jsonResponse.sprites.front_default,
            name: jsonResponse.species.name
        }
        
        setPokedexEntry(obj);

    }

    return[pokedexEntry,getPokemonURL];
}