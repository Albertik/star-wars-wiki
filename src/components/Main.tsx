import React from 'react';
import styled from 'styled-components';
import CharactersContainer from '../containers/CharactersContainer';
import Navigation from './nav/Navigation';

const Main = () => {
	return (
		<StyledCrossFadeContainer>
			<Navigation />
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
	margin: 100px auto 0;
`;

const StyledHeading = styled.h1`
	text-align: center;
`;

export default Main;
