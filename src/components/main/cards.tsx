import React, {useEffect, useState} from 'react';
import s from "./main.module.css";
import PokemonCard from "./pokemonCard";
import {Pokemon, PokemonList, PokemonShortInfo} from "../../store/types/pokemonDataTypes";
import Loading from "../utils/Loading";
import {Pagination, PaginationProps} from 'antd';
import {getPokemonList, getPokemons} from "../../api/fetchRequsts";
import Search from '../search/search';

const Cards = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pokemonCount, setPokemonCount] = useState<number>()
    const [pokemonsShortInfo, setPokemonsShortInfo] = useState<PokemonShortInfo[]>([])


    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPageSize(pageSize)
    };

    const onPageChange: PaginationProps['onChange'] = (page) => {
        setPage(page)
    }

    useEffect( ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getPokemons(page, pageSize)
            .then(result =>{
                setPokemons(result.data)
                setPokemonCount(result.count)
                setIsLoading(true)
            })
    }, [page, pageSize])

    useEffect(()=>{
        getPokemonList()
            .then(response => {
                setPokemonsShortInfo(response.results)
            })
            .catch(error => console.log("Failed to fetch pokemon: ", error))
    }, [])

    if(!isLoading){
        return <Loading/>
    }

    // @ts-ignore
    return (
        <>

            <Search pokemonList={pokemonsShortInfo}/>
            <div className={s.content}>
                {pokemons.map((value, index, array) =>
                    <PokemonCard entity={value}/>
                )}
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    onChange={onPageChange}
                    defaultCurrent={1}
                    total={pokemonCount}
                />
            </div>
        </>

    );
};

export default Cards;