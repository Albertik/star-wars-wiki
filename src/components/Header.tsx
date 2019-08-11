import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/Star_Wars_Logo.svg';

const Header = () => {
	return (
		<StyledFixedHeaderPlaceholder>
			<StyledFixedHeader>
				<StyledLogo>
					<Logo />
				</StyledLogo>
			</StyledFixedHeader>
		</StyledFixedHeaderPlaceholder>
	);
};

const StyledFixedHeader = styled.header`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	height: 7.6rem;
	z-index: 10;
	min-width: 320px;

	@media (max-width: 885px) {
		height: 7rem;
	}
`;

const StyledFixedHeaderPlaceholder = styled.div`
	display: block;
	height: 7rem;
	margin-bottom: 4rem;
`;

const StyledLogo = styled.div`
	padding: 10px 0;
	height: 10rem;
	background-image: linear-gradient(${props => props.theme.fg}, ${props => props.theme.fgWithOpacity(0)});
	/* background-color: ${props => props.theme.fg}; */

	svg {
		height: 80px;
		width: 100%;
	}
`;

export default Header;
