import React, {useState} from 'react';
import {AutoComplete, Input} from 'antd';
import {useNavigate} from 'react-router-dom';
import {PokemonShortInfo} from "../../store/types/pokemonDataTypes";

interface SearchProps {
    pokemonList: PokemonShortInfo[];
}

const Search: React.FC<SearchProps> = ({pokemonList}) => {
    const navigation = useNavigate();
    const [options, setOptions] = useState<any>([]);

    const getBoldedVariant = (charPrinted: number, variant: string): JSX.Element => {
        if (charPrinted > variant.length)
            return <b>{variant}</b>
        let bold = variant.slice(0, charPrinted)
        let common = variant.slice(charPrinted, variant.length)
        return <><b>{bold}</b>{common}</>
    }

    const handleSearch = (value: string) => {
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.indexOf(value.toLowerCase()) === 0
        );

        setOptions(
            filteredList.map((pokemon) => {
                return {
                    value: pokemon.name,
                    label: getBoldedVariant(value.length, pokemon.name),
                }
            })
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
            style={{width: 200}}
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