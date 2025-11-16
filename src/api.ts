import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const apiClient = axios.create({
    baseURL: API_URL,
});

export interface SimplePokemon {
    name: string;
    id: number;
    image: string;
}

export interface EvolutionStep {
    name: string;
    id: number;
    image: string;
}

export interface DetailedPokemon {
    id: number;
    name: string;
    abilities: string[];
    types: string[];
    image: string;
    evolution: EvolutionStep[];
}

export const getPokemonList = async (): Promise<SimplePokemon[]> => {
    const response = await apiClient.get('/pokemon');
    return response.data;
};

export const getPokemonDetails = async (name: string): Promise<DetailedPokemon> => {
    const response = await apiClient.get(`/pokemon/${name}`);
    return response.data;
};

export const getFavorites = async (): Promise<string[]> => {
    const response = await apiClient.get('/favorites');
    return response.data;
};

export const addFavorite = async (name: string): Promise<string[]> => {
    const response = await apiClient.post('/favorites', { name });
    return response.data;
};

export const removeFavorite = async (name: string): Promise<string[]> => {
    const response = await apiClient.delete(`/favorites/${name}`);
    return response.data;
};