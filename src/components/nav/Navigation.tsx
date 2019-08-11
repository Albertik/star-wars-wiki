import React from 'react';
import SearchBar from './SearchBar';
import SearchFilter from './SearchFilter';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { CharactersStore } from '../../stores/CharactersStore';

type Props = {
	charactersStore?: CharactersStore;
};

const Navigation = inject('charactersStore')(
	observer(({ charactersStore }: Props) => {
		return (
			<StyledNavigation isLoading={charactersStore!.isLoading}>
				<SearchBar />
				<SearchFilter />
			</StyledNavigation>
		);
	})
);

const StyledNavigation = styled.nav<{ isLoading: boolean }>`
	display: ${props => (props.isLoading ? 'none' : 'flex')};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
`;

export default Navigation;
