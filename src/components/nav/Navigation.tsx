import React from 'react';
import SearchBar from './SearchBar';
import SearchFilter from './SearchFilter';
import styled from 'styled-components';

const Navigation = () => {
	return (
		<StyledNavigation>
			<SearchBar />
			<SearchFilter />
		</StyledNavigation>
	);
};

const StyledNavigation = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
`;

export default Navigation;
