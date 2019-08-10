import React from 'react';
import styled from 'styled-components';
import CharactersContainer from '../containers/CharactersContainer';
import SearchBar from './nav/SearchBar';

const Main = () => {
	return (
		<StyledCrossFadeContainer>
			<StyledSearchBar>
				<SearchBar />
			</StyledSearchBar>
			<Heading />
			<CharactersContainer />
		</StyledCrossFadeContainer>
	);
};

const Heading = () => (
	<StyledHeading>
		Characters{' '}
		<span aria-label="Character image" role="img">
			🤷
		</span>
	</StyledHeading>
);

const StyledCrossFadeContainer = styled.main`
	position: relative;
	min-height: 100%;
	padding: 1px 0 0;
	margin: 75px auto 0;
`;

const StyledHeading = styled.h1`
	text-align: center;
`;

const StyledSearchBar = styled.div`
	position: fixed;
	top: 95px;
	right: 45px;
	padding-left: 15px;
	z-index: 10;
`;

export default Main;
