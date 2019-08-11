import React from 'react';
import styled from 'styled-components';
import CharactersContainer from '../containers/CharactersContainer';
import Navigation from './nav/Navigation';

const Main = () => {
	return (
		<StyledCrossFadeContainer>
			<Navigation />
			<CharactersContainer />
		</StyledCrossFadeContainer>
	);
};

const StyledCrossFadeContainer = styled.main`
	position: relative;
	min-height: 100%;
	padding: 1px 0 0;
	margin: 100px auto 0;
`;

export default Main;
