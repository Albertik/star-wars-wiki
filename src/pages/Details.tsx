import React from 'react';
import { CharacterType } from '../types/index';
import CharactersContainer from '../containers/CharactersContainer';
import ErrorBoundary from '../containers/ErrorBoundaryContainer';

type Props = {
	index: number;
	item: CharacterType;
};

export const DetailsPage = ({ item, index }: Props) => {
	return (
		<ErrorBoundary>
			<CharactersContainer />
		</ErrorBoundary>
	);
};
