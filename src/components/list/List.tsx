import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { withLoading, withErrorHandling } from '../../hocs';

const List = ({ items, error, loading, children }: any) => (
	<StyledListContainer>
		{children}
		{items.length === 0 ? (
			<StyledWithoutResults>No characters found...</StyledWithoutResults>
		) : (
			<StyledList>
				{items &&
					Array.from(items).map((i: any, idx: number) => (
						<ListItem error={error} loading={loading} isDetailed={false} key={idx} item={i} />
					))}
			</StyledList>
		)}
	</StyledListContainer>
);

const StyledListContainer = styled.div``;

const StyledList = styled.ul`
	list-style: none;
	padding: 0;
`;

const StyledWithoutResults = styled.p`
	padding: 1em 2rem;
	margin: 100px auto;
	text-align: center;
`;

export default withLoading(withErrorHandling(List));
