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
	const getIdFromUrl = (url: string, index = 2): number => {
		let urlParts = url.split('/');
		return parseInt(urlParts[urlParts.length - index]);
	};

	if (item) {
		let { name, gender, birth_year, eye_color, hair_color, skin_color, url, mass, height, films, starships } = item;
		let id = getIdFromUrl(url);
		let pronoun = gender === 'male' ? 'he' : gender === 'female' ? 'she' : 'it';
		let possessivePronoun = gender === 'male' ? 'his' : gender === 'female' ? 'her' : 'its';
		let years = parseInt(birth_year.substr(0, birth_year.length - 3));
		let bornAt = years > 1 ? `${years} years` : `${years} year`;
		let hairColor = hair_color === 'n/a' ? `${pronoun} does not have hair` : `${possessivePronoun} hair color is ${hair_color}`;
		let skinColor = skin_color === 'n/a' ? ' robot has no skin' : ` ${possessivePronoun} skin color is ${skin_color}`;
		let filmsArray = films.map(f => getIdFromUrl(f));
		let appearsInEpisodes =
			filmsArray.length === 1
				? `Appears in episode ${filmsArray.join('')}(film id)`
				: `Appears in episodes ${filmsArray.join(',')}(ids of films)`;
		let starshipsArray = starships.map(f => getIdFromUrl(f));
		let hasStarships =
			starshipsArray.length === 0
				? 'does not have any starship'
				: starshipsArray.length === 1
				? `${pronoun} has this starship ${starshipsArray.join(',')}(starship id)`
				: `${pronoun} has these starships ${starshipsArray.join(',')}(starship ids)`;

		return (
			<div>
				<StyledLink to={`/details/${id}`}>{item.name}</StyledLink>
				<CharacterEmoji gender={gender} />
				<Favorite id={id} />
				<StyledParagraph isDetailed={isDetailed}>
					{name} - was born at {bornAt} Before the Battle of Yavin.
					<StyledCapitalize> {possessivePronoun}</StyledCapitalize> eye color is {eye_color}, {hairColor} and
					{isDetailed ? (
						<span>
							{skinColor}.<StyledCapitalize> {possessivePronoun}</StyledCapitalize> weigth is {mass} kilogrammes and {possessivePronoun}{' '}
							height is {height}. {appearsInEpisodes} and {hasStarships}.
						</span>
					) : (
						'...'
					)}
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
	text-decoration: none;
	color: ${props => props.theme.bg};
	font-weight: bold;
	:hover {
		transition: color 0.5s;
		color: ${props => props.theme.bgWithOpacity(0.5)};
		text-decoration: underline;
	}
`;

export default Description;
