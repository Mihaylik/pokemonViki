
import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import {Link, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {PokemonList, PokemonShortInfo} from "../../store/types/pokemonDataTypes";

interface SearchProps {
    pokemonList: PokemonShortInfo[];
}

const { Option } = AutoComplete;

const Search: React.FC<SearchProps> = ({ pokemonList }) => {
    const navigation = useNavigate();
    const [options, setOptions] = useState<any>([]);

    const handleSearch = (value: string) => {
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.includes(value.toLowerCase())
        );

        setOptions(
            filteredList.map((pokemon) => ({
                value: pokemon.name,
                label: pokemon.name,
            }))
        );
    };

    const onSelect = (value: string) => {
        const selectedPokemon = pokemonList.find(
            (pokemon) => pokemon.name === value.toLowerCase()
        );
        if (selectedPokemon) {
            navigation(`/pokemon/${selectedPokemon.name}`);
        }
    };

    const handleSearchClick = (value: string) => {
        const selectedPokemon = pokemonList.find(
            (pokemon) => pokemon.name === value.toLowerCase()
        );
        if (selectedPokemon) {
            navigation(`/pokemon/${selectedPokemon.name}`);
        }
    };

    return (
        <AutoComplete
            options={options}
            style={{ width: 200 }}
            onSelect={onSelect}
            onSearch={handleSearch}
            filterOption={(inputValue, option) =>
                option!.value!.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
        >
            <Input.Search
                placeholder="Пошук покемона"
                enterButton="Пошук"
                size="large"
                onSearch={handleSearchClick}
            />
        </AutoComplete>
    );
};

export default Search;