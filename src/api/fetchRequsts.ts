import {Pokemon, PokemonList} from "../store/types/pokemonDataTypes";

export const getPokemonList = async (limit: number = 10000, offset: number = 0): Promise<PokemonList> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json() as PokemonList;
    return data;
};

export const getPokemonDetails = async (id: number | string): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data as Pokemon;
};

export const getPokemons = async (page: number, pageSize: number): Promise<{data: Pokemon[], count: number}> => {
    const pageContent = [] as Pokemon[]
    const offset = (page - 1) * pageSize;
    const pokemonList = await getPokemonList(pageSize, offset);
    const pokemonCount = pokemonList.count
    for (const pokemonResult of pokemonList.results) {

        const pokemon = await getPokemonDetails(pokemonResult.name);
        pageContent.push(pokemon)
    }
    return {data: pageContent, count: pokemonCount}
};