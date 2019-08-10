import React from 'react';
import styled from 'styled-components';

type Props = {
	error: boolean;
};

export const withErrorHandling = <P extends object>(Component: React.ComponentType<P>) =>
	class WithErrorHandling extends React.Component<P & Props> {
		render() {
			const { error, ...props } = this.props;
			return error ? (
				<StyledError>Something unexpected happened, please reload a page and try again!</StyledError>
			) : (
				<Component {...props as P} />
			);
		}
	};

const StyledError = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 700px;
	font-size: 1.2em;
	padding: 0 20px;
`;
