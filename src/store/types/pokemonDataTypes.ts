type VersionDetails = {
    rarity: number;
    version: {
        name: string;
        url: string;
    };
};

type Version = {
    version: {
        name: string;
        url: string;
    };
};

type Sprites = {
    back_default: string;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string;
            front_female: string;
        };
        'official-artwork': {
            front_default: string | null;
        };
    };
    versions: Record<string, Version>;
};

type Stat = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

type Move = {
    move: {
        name: string;
        url: string;
    };
    version_group_details: VersionDetails[];
};

type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

export type PokemonShortInfo = {
    name: string,
    url: string
}

export type PokemonList = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonShortInfo[];
}


// Опис основного типу Pokemon
export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: Stat[];
    abilities: Ability[];
    moves: Move[];
    types: Type[];
    sprites: Sprites;
    past_types: Type[];
    is_default: boolean;
};

