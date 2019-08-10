import React from 'react';
import { CharacterType } from '../../types/index';
import { Link } from 'react-router-dom';
import Favorite from './Favourite';
import styled from 'styled-components';

type Props = {
	item?: CharacterType;
	isDetailed: boolean;
};

const Description = ({ item, isDetailed }: Props) => {
	if (item) {
		let { name, gender, birth_year, eye_color, hair_color, url } = item;
		let urlParts = url.split('/');
		let id = parseInt(urlParts[urlParts.length - 2]);
		let pronoun = gender === 'male' ? 'he' : gender === 'female' ? 'she' : 'it';
		let possessivePronoun = gender === 'male' ? 'his' : gender === 'female' ? 'her' : 'its';
		let years = parseInt(birth_year.substr(0, birth_year.length - 3));
		let bornAt = years > 1 ? `${years} years` : `${years} year`;
		let hairColor = hair_color === 'n/a' ? `${pronoun} does not have hair` : `${possessivePronoun} hair color is ${hair_color}`;

		return (
			<div>
				<StyledLink to={`/details/${id}`}>{item.name}</StyledLink>
				<CharacterEmoji gender={gender} />
				<Favorite id={id} />
				<StyledParagraph isDetailed={isDetailed}>
					<strong>{name}</strong> - was born at {bornAt} Before the Battle of Yavin.
					<StyledCapitalize> {possessivePronoun}</StyledCapitalize> eye color is {eye_color}, {hairColor}.
				</StyledParagraph>
			</div>
		);
	} else {
		console.warn('item was not passed to Description component!');
		return null;
	}
};

const CharacterEmoji = ({ gender }: any) => {
	return gender === 'male' ? (
		<span aria-label="Man" role="img">
			👨
		</span>
	) : gender === 'female' ? (
		<span aria-label="Female" role="img">
			👩
		</span>
	) : (
		<span aria-label="Robot" role="img">
			🤖
		</span>
	);
};

const StyledCapitalize = styled.span`
	text-transform: capitalize;
`;

const StyledParagraph = styled.p<{ isDetailed: boolean }>`
	@media (min-width: 700px) {
		width: ${props => (props.isDetailed ? 'inherit' : '570px')};
		white-space: ${props => (props.isDetailed ? 'inherit' : 'nowrap')};
		overflow: ${props => (props.isDetailed ? 'inherit' : 'hidden')};
		text-overflow: ${props => (props.isDetailed ? 'inherit' : 'ellipsis')};
	}
`;

const StyledLink = styled(Link)`
	padding-right: 10px;
`;

export default Description;
