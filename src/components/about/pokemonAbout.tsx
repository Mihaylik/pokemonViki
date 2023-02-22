import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Row, Col, Card, Spin, Tag} from "antd";
import {Pokemon} from "../../store/types/pokemonDataTypes";
import {getPokemonDetails} from "../../api/fetchRequsts";

interface PokemonParams {
    id?: string;
    [key: string]: string | undefined;
}

const PokemonPage = () => {
    const { id } = useParams<PokemonParams>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const colors = ['purple','geekblue','blue','cyan','cyan','green','lime','gold','orange','volcano','red','magenta']

    useEffect(() => {
        getPokemonDetails(id!)
            .then(response => {
                setPokemon(response)
                setIsLoading(false)
            })
            .catch(error => console.log("Failed to fetch pokemon: ", error))
            .finally(() => setIsLoading(false))
    }, [id]);

    return (
        <div>
            {isLoading && <Spin size="large" />}
            {pokemon && (
                <>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Card
                                hoverable
                                cover={<img alt={pokemon.name} src={pokemon.sprites.front_default} />}
                            >
                                <Card.Meta title={pokemon.name} description={`#${pokemon.id}`} />
                            </Card>
                        </Col>
                        <Col xs={24} md={16}>
                            <Card title="Details">
                                <p>Height: {pokemon.height}</p>
                                <p>Weight: {pokemon.weight}</p>
                                <p>Base experience: {pokemon.base_experience}</p>
                                <p>Abilities:</p>
                                    {pokemon.abilities.map((ability, index) => (
                                        <Tag color={colors[index]}>{ability.ability.name}</Tag>
                                    ))}
                                <p>Types:</p>
                                    {pokemon.types.map((type, index) => (
                                        <Tag color={colors[index]}>{type.type.name}</Tag>
                                    ))}
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default PokemonPage;