export interface CharacterType {
	name: string;
	birth_year: string;
	eye_color: string;
	films: string[];
	gender: string;
	hair_color: string;
	height: string;
	skin_color: string;
	mass: string;
	isDeleted: boolean;
	favourite: boolean;
	url: string;
}

export enum Visibility {
	All,
	Favourite
}

export interface SearchFilterType {
	searchTerm: string;
	visibility: Visibility;
}
