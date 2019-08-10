import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
	children: object;
};

type State = {
	hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
	state = { hasError: false };

	componentDidCatch(error: any) {
		this.setState({ hasError: true });
		console.error(error.message);
	}

	render() {
		if (this.state.hasError) {
			return (
				<StyledContainer>
					<h1>Something went wrong</h1>
				</StyledContainer>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

const StyledContainer = styled.div`
	display: 'flex';
	justify-content: 'center';
	align-items: 'center';
	flex-direction: 'column';
`;
