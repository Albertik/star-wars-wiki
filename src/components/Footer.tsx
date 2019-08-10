import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
	return <StyledFooter />;
};

const StyledFooter = styled.footer`
	margin-top: auto;
	font-weight: 300;
	line-height: 2.4rem;
	background-color: ${props => props.theme.fg};
	border-top: 1px solid #ebebeb;
`;
