import React, {FC} from 'react';
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import {Pokemon} from "../../store/types/pokemonDataTypes";
import {Link} from "react-router-dom";

type Props = {
    entity: Pokemon
}

const PokemonCard: FC<Props> = ({entity}) => {
    const imageSrcDefault = entity.sprites.other.dream_world.front_default
    return (
        <Link to={'/pokemon/' + entity.name}>
            <Card
                hoverable
                style={{width: 240, margin: '15px'}}
                cover={<img alt="example" style={{height: '275px'}} src={imageSrcDefault}/>}
            >
                <Meta title={entity.name} description={`Weight: ${entity.weight}`}/>
            </Card>
        </Link>

    );
};

export default PokemonCard;