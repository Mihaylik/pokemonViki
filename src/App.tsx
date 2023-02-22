import React, {useEffect, useState} from 'react';
import './App.css';
import {Breadcrumb, Layout, Menu, Switch, theme} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Cards from "./components/main/cards";
import PokemonPage from "./components/about/pokemonAbout";
import PokemonAbout from "./components/about/pokemonAbout";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import cards from "./components/main/cards";
import {PokemonShortInfo} from "./store/types/pokemonDataTypes";
import {getPokemonDetails, getPokemonList} from "./api/fetchRequsts";
import Search from "./components/search/search";

function App() {


    return (
        <Layout className="layout">
            <Header>
                <a href={'/'}>
                    <div className="logo">
                        Pokemons
                    </div>
                </a>

            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {/*<Cards/>*/}
                    {/*<PokemonAbout/>*/}
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Cards/>} />
                            <Route path="/pokemon/:id" element={<PokemonAbout/>} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>By Dima Myhaylov</Footer>
        </Layout>
  );
}

export default App;
