import React from 'react';
import { Spinner } from '../components/Spinner';

type Props = {
	loading: boolean;
};

export const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
	class WithLoading extends React.Component<P & Props> {
		render() {
			const { loading, ...props } = this.props;
			return loading ? <Spinner /> : <Component {...props as P} />;
		}
	};
