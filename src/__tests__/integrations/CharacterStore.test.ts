import { action, observable } from 'mobx';
import { CharactersStore } from '../../stores/CharactersStore';

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

describe('integration tests', () => {
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

	it('should update characters after loading characters from api', done => {
		store.loadCharacters().then(() => {
			//api should return ten records
			expect(store.getCharacters().length).toBe(10);
			expect(store.getCharacter(1).favourite).toBe(false);
			expect(store.getCharacter(1).name).toBe('Luke Skywalker');
			expect(store.getCharacter(1).mass).toBe('77');
			expect(store.getCharacter(1).height).toBe('172');
			done();
		});
	});

	it('should update character after loading character from api', done => {
		store.loadCharacter(1).then(() => {
			expect(store.getCharacter(1).favourite).toBe(false);
			expect(store.getCharacter(1).name).toBe('Luke Skywalker');
			expect(store.getCharacter(1).mass).toBe('77');
			expect(store.getCharacter(1).height).toBe('172');
			done();
		});
	});
});
