import React from 'react';
import Main from '../components/Main';
import ErrorBoundary from '../containers/ErrorBoundaryContainer';

export const HomePage = () => {
	return (
		<ErrorBoundary>
			<Main />
		</ErrorBoundary>
	);
};
