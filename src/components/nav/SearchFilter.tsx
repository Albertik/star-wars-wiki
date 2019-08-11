import React from 'react';
import { Visibility } from '../../types';
import { inject, observer } from 'mobx-react';
import { CharactersStore } from '../../stores/CharactersStore';
import styled from 'styled-components';

const SearchFilter = () => {
	return (
		<StyledSearchFilter>
			<span>Show: </span>
			<FilterLink filter={Visibility.All}>All</FilterLink>
			<FilterLink filter={Visibility.Favourite}>Favourite</FilterLink>
		</StyledSearchFilter>
	);
};

const StyledSearchFilter = styled.div`
	padding-top: 15px;
`;

type FilterLinkProps = {
	charactersStore?: CharactersStore;
	filter: Visibility;
	children: any;
};
const FilterLink = inject('charactersStore')(
	observer(({ filter, children, charactersStore }: FilterLinkProps) => {
		let active = filter === charactersStore!.searchFilter.visibility;
		const onClick = (e: React.SyntheticEvent) => {
			e.preventDefault();
			let searchFilter = Object.assign({}, charactersStore!.searchFilter);
			searchFilter.visibility = filter;

			charactersStore!.changeSearchFilter(searchFilter);
		};

		return <Link children={children} active={active} onClick={onClick} />;
	})
);

type LinkProps = {
	active: boolean;
	children: object;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const Link = ({ active, children, onClick }: LinkProps) => (
	<StyledButton onClick={onClick} disabled={active}>
		{children}
	</StyledButton>
);

const StyledButton = styled.button`
	padding: 10px;
	margin: 10px;
`;

export default SearchFilter;
