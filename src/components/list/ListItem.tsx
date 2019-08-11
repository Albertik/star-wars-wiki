import React from 'react';
import styled from 'styled-components';
import { CharacterType } from '../../types/index';
import Description from './Description';
import { withLoading, withErrorHandling } from '../../hocs';

type Props = {
	item?: CharacterType | undefined;
	isDetailed: boolean;
};

const ListItem = (props: Props) => {
	return (
		<StyledListItem isDetailed={props.isDetailed}>
			<StyledListItemContent>
				<Description {...props} />
			</StyledListItemContent>
		</StyledListItem>
	);
};

const StyledListItem = styled.li<{ isDetailed: boolean }>`
	min-height: ${props => (props.isDetailed ? '50vh' : '100%')};
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 15px;
	padding: 1em;
	margin: ${props => (props.isDetailed ? '6em auto' : '1em auto')} ;
	animation: fadeIn 0.5s linear;
	animation-fill-mode: both;
	border: 5px solid transparent;
	box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.25);
	max-width: 765px;

	/* :last-child {
		border-bottom: 5px solid ${props => props.theme.fg};
	} */

	@keyframes fadeIn {
		0% {
			opacity: 0;
			top: 100px;
		}
		75% {
			opacity: 0.5;
			top: 0px;
		}
		100% {
			opacity: 1;
		}
	}
`;

const StyledListItemContent = styled.div`
	display: inline-block;
`;

export default withLoading(withErrorHandling(ListItem));
