import axios from 'axios';
const url = 'https://swapi.co/api';

export const fetchCharacters = () => {
	return axios.get(`${url}/people`);
};

export const fetchCharacterById = (id: number) => {
	return axios.get(`${url}/people/${id}`);
};

export default {
	fetchCharacters,
	fetchCharacterById
};
