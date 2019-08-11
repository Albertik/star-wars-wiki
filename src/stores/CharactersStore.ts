import { observable, action, configure, autorun, toJS, computed, ObservableMap } from 'mobx';
import API from '../helpers/API';
import { AxiosResponse } from 'axios';
import { CharacterType, SearchFilterType, Visibility } from '../types/index';

const LS_CHARACTERS_STORE = 'LS_CHARACTERS_STORE';
const localStorage = window.localStorage;

configure({
	enforceActions: 'observed'
});

export class CharactersStore {
	@observable isLoading: boolean = false;
	@observable error: boolean = false;
	@observable charactersRegistry: ObservableMap<string, CharacterType> = observable.map({});
	@observable searchFilter: SearchFilterType = {
		searchTerm: '',
		visibility: Visibility.All
	};

	constructor() {
		let initialData = JSON.parse(localStorage.getItem(LS_CHARACTERS_STORE) || 'null');
		let firstRun = true;

		if (initialData) {
			this.charactersRegistry.replace(observable.map(initialData.charactersRegistry));
		}
		autorun(() => {
			const json = JSON.stringify(toJS(this));
			if (!firstRun) {
				localStorage.setItem(LS_CHARACTERS_STORE, json);
			}
			firstRun = false;
		});
	}

	@computed get characters(): CharacterType[] {
		return this.getCharacters();
	}

	clear() {
		this.charactersRegistry.clear();
	}

	getCharacters() {
		let values = Array.from(this.charactersRegistry!.values());

		if (this.searchFilter.visibility === Visibility.Favourite) {
			values = values.filter((v: CharacterType) => v.favourite);
		}

		if (this.searchFilter.searchTerm) {
			values = values.filter((v: CharacterType) => v.name.toLowerCase().search(this.searchFilter.searchTerm.toLowerCase()) > -1);
		}
		return values;
	}

	getCharacter(id: number) {
		return (id && this.charactersRegistry.get(id.toString())) || this.getCharacters()[id - 1];
	}

	@action
	loadCharacters(): Promise<void | AxiosResponse<any>> {
		this.isLoading = true;
		this.error = false;
		return API.fetchCharacters()
			.then(
				action('fetchCharactersSuccess', ({ data }: AxiosResponse<any>) => {
					let { results } = data;
					let values = this.charactersRegistry;

					results = results.map((c: CharacterType, index: number) =>
						Object.assign(
							{ favourite: values.get((index + 1).toString()) && (values.get((index + 1).toString()) || { favourite: false }).favourite },
							c
						)
					);

					this.clear();

					results.forEach((c: CharacterType) => {
						let urlParts = c.url.split('/');
						let id = parseInt(urlParts[urlParts.length - 2]);
						this.charactersRegistry.set(id.toString(), c);
					});
				})
			)
			.catch(
				action(() => {
					this.error = true;
				})
			)
			.finally(
				action(() => {
					this.isLoading = false;
				})
			);
	}

	@action
	loadCharacter(id: number): Promise<void | AxiosResponse<any>> {
		this.isLoading = true;
		this.error = false;

		return API.fetchCharacterById(id)
			.then(
				action('fetchCharacterSuccess', ({ data }: AxiosResponse<any>) => {
					let character = this.getCharacter(id);
					this.charactersRegistry.set(id.toString(), Object.assign({ favourite: (character && character.favourite) || false }, data));
				})
			)
			.catch(
				action('fetchCharacterFailure', () => {
					this.error = true;
				})
			)
			.finally(
				action(() => {
					this.isLoading = false;
				})
			);
	}

	@action
	toggleFavorite(id: number): Promise<void | AxiosResponse<any>> {
		const character: CharacterType = this.getCharacter(id);

		if (character) {
			character.favourite = !character.favourite;
			this.charactersRegistry.set(id.toString(), character);
		}
		return Promise.resolve();
	}

	@action
	changeSearchFilter(searchFilter: SearchFilterType) {
		this.searchFilter = searchFilter;
	}
}

export default new CharactersStore();
