import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
	return <StyledFooter />;
};

const StyledFooter = styled.footer`
	height: 50px;
	/* background-color: ${props => props.theme.fg}; */
	/* border-top: 1px solid #ebebeb; */
`;
