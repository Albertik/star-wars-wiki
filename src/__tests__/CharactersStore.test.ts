import { CharactersStore } from '../stores/CharactersStore';
import { observable, action } from 'mobx';
import API from '../helpers/API';
import { Visibility } from '../types';

const testCharacterData = {
	'1': {
		name: 'test',
		birth_year: 'test',
		eye_color: 'test',
		films: ['test', 'test'],
		gender: 'test',
		hair_color: 'test',
		height: 'test',
		skin_color: 'test',
		mass: 'test',
		isDeleted: false,
		favourite: false,
		url: 'test'
	}
};

const responseForFetchCharacterByID = { data: { name: 'Luke Skywalker', mass: '77', height: '172' } };
const responseForFetchCharacters: any = {
	data: {
		results: [
			{
				name: 'Luke Skywalker',
				height: '172',
				mass: '77',
				hair_color: 'blond',
				skin_color: 'fair',
				eye_color: 'blue',
				birth_year: '19BBY',
				gender: 'male',
				homeworld: 'https://swapi.co/api/planets/1/',
				films: [
					'https://swapi.co/api/films/2/',
					'https://swapi.co/api/films/6/',
					'https://swapi.co/api/films/3/',
					'https://swapi.co/api/films/1/',
					'https://swapi.co/api/films/7/'
				],
				species: ['https://swapi.co/api/species/1/'],
				vehicles: ['https://swapi.co/api/vehicles/14/', 'https://swapi.co/api/vehicles/30/'],
				starships: ['https://swapi.co/api/starships/12/', 'https://swapi.co/api/starships/22/'],
				created: '2014-12-09T13:50:51.644000Z',
				edited: '2014-12-20T21:17:56.891000Z',
				url: 'https://swapi.co/api/people/1/'
			}
		]
	}
};

describe('CharactersStore', () => {
	let store: CharactersStore;
	beforeEach(() => {
		store = new CharactersStore();
		action(() => {
			store.charactersRegistry = observable.map(testCharacterData);
		})();
	});
	afterEach(() => {
		action('Reset store', () => store.clear())();
	});

	it('should be able to toggle favourite', () => {
		let store = new CharactersStore();
		action(() => {
			store.charactersRegistry = observable.map(testCharacterData);
		})();
		store.toggleFavorite(1);
		expect(store.getCharacter(1).favourite).toBe(true);
	});

	//this is a unit test
	it('should update character after loading character from mocked api', done => {
		let mockFetchCharacterById = jest.fn().mockResolvedValue(responseForFetchCharacterByID);

		API.fetchCharacterById = mockFetchCharacterById;
		store
			.loadCharacter(1)
			.then(() => {
				expect(store.getCharacter(1).favourite).toBe(false);
				expect(store.getCharacter(1).name).toBe('Luke Skywalker');
				expect(store.getCharacter(1).mass).toBe('77');
				expect(store.getCharacter(1).height).toBe('172');
				expect(mockFetchCharacterById.mock.calls.length).toBe(1);
				expect(mockFetchCharacterById.mock.calls[0]).toEqual([1]);
				expect(store.isLoading).toBe(false);
				expect(store.error).toBe(false);
				done();
			})
			.catch(done);
	});

	//this is a unit test
	it('should update characters after loading characters from mocked api', done => {
		const mockFetchCharacters = jest.fn().mockResolvedValue(responseForFetchCharacters);

		API.fetchCharacters = mockFetchCharacters;

		store.loadCharacters().then(() => {
			expect(mockFetchCharacters.mock.calls.length).toBe(1);
			expect(mockFetchCharacters.mock.calls[0]).toEqual([]);
			expect(store.getCharacters().length).toBe(1);
			expect(store.getCharacter(1).favourite).toBe(false);
			expect(store.getCharacter(1).name).toBe('Luke Skywalker');
			expect(store.getCharacter(1).mass).toBe('77');
			expect(store.getCharacter(1).height).toBe('172');
			expect(store.isLoading).toBe(false);
			expect(store.error).toBe(false);
			done();
		});
	});

	it('should search characters by name', () => {
		let searchFilter = Object.assign({}, store.searchFilter);
		searchFilter.searchTerm = 'test';
		store.changeSearchFilter(searchFilter);
		expect(store.getCharacters().length).toBe(1);
		expect(store.searchFilter.searchTerm).toBe('test');
		searchFilter.searchTerm = 'notexist';
		store.changeSearchFilter(searchFilter);
		expect(store.getCharacters().length).toBe(0);
		expect(store.searchFilter.searchTerm).toBe('notexist');
	});

	it('should show only favourited characters', () => {
		let searchFilter = Object.assign({}, store.searchFilter);
		searchFilter.visibility = Visibility.Favourite;
		store.changeSearchFilter(searchFilter);
		expect(store.getCharacters().length).toBe(0);
		expect(store.searchFilter.visibility).toBe(Visibility.Favourite);
		searchFilter.visibility = Visibility.All;
		store.changeSearchFilter(searchFilter);
		expect(store.getCharacters().length).toBe(1);
		expect(store.searchFilter.visibility).toBe(Visibility.All);
	});
});
