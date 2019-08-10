import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { CharactersStore } from '../../stores/CharactersStore';

type Props = {
	charactersStore?: CharactersStore;
	id: number;
};

const Favourite = inject('charactersStore')(
	observer(({ id, charactersStore }: Props) => {
		let character = charactersStore!.getCharacter(id);
		let favourite = (character && character.favourite) || false;

		return (
			<StyledFavourite onClick={() => charactersStore!.toggleFavorite(id)} favourite={favourite}>
				♡
			</StyledFavourite>
		);
	})
);

const StyledFavourite = styled.span<{ favourite: boolean }>`
	cursor: pointer;
	color: ${props => (props.favourite ? 'red' : 'initial')};
	background: ${props => (props.favourite ? 'radial-gradient(pink, transparent)' : 'initial')};
	float: right;
`;

export default Favourite;
