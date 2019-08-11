import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { CharactersStore } from '../../stores/CharactersStore';

type Props = {
	charactersStore?: CharactersStore;
};

const SearchBar = inject('charactersStore')(
	observer(({ charactersStore }: Props) => {
		const isActiveSearch = charactersStore!.searchFilter.searchTerm.length !== 0;
		const [input, setInput] = useState(charactersStore!.searchFilter.searchTerm);
		const [barOpened, setBarOpened] = useState(isActiveSearch);
		const formRef = useRef<any>();
		const inputFocus = useRef<any>();

		useEffect(() => {
			// add when mounted
			document.addEventListener('mousedown', handleClick);
			document.addEventListener('touchstart', handleClick);
			// cleanup event when unmounted
			return () => {
				document.removeEventListener('mousedown', handleClick);
				document.removeEventListener('touchstart', handleClick);
			};
		}, []);

		const handleClick = (e: Event) => {
			if (formRef.current.contains(e.target)) {
				// click was inside form, do nothing
				return;
			}

			inputFocus.current.blur();
			setBarOpened(false);
		};

		const onChange = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			let element = e.target as HTMLInputElement;
			let searchFilter = Object.assign({}, charactersStore!.searchFilter);

			searchFilter.searchTerm = element.value;
			setInput(element.value);
			charactersStore!.changeSearchFilter(searchFilter);
		};

		const onFormSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
			e.preventDefault();
			inputFocus.current.blur();
			setBarOpened(false);
		};

		return (
			<StyledForm
				barOpened={barOpened}
				onClick={() => {
					inputFocus.current.focus();
					setBarOpened(true);
				}}
				onSubmit={onFormSubmit}
				ref={formRef}
			>
				<StyledInput value={input} onChange={onChange} ref={inputFocus} placeholder="Search for a character..." />
				<StyledButton onTouchEnd={onFormSubmit} barOpened={barOpened}>
					Search
				</StyledButton>
			</StyledForm>
		);
	})
);

const StyledForm = styled.form<{ barOpened: boolean }>`
	position: relative;
	display: flex;
	align-items: right;
	justify-content: center;
	box-shadow: 0 4px 8px ${props => props.theme.fg};
	background-color: ${props => props.theme.bg};
	/* Change width of the form depending if the bar is opened or not */
	/* If bar opened, normal cursor on the whole form. If closed, show pointer on the whole form so user knows he can click to open it */
	cursor: ${props => (props.barOpened ? 'auto' : 'pointer')};
	padding: 1rem;
	height: 2rem;
	margin: 0 auto;
	border-radius: 10rem;
	transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
	width: ${props => (props.barOpened ? 'calc(100% - 3rem)' : '3rem')};
	font-size: 14px;

	@media (min-width: 600px) {
		width: ${props => (props.barOpened ? '30rem' : '2rem')};
	}
`;

const StyledInput = styled.input<any>`
	line-height: 2;
	background-color: transparent;
	width: 100%;
	margin-left: ${props => (props.barOpened ? '1rem' : '0rem')};
	border: none;
	color: ${props => props.theme.fg};
	transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

	&:focus,
	&:active {
		outline: none;
	}
	&::placeholder {
		color: white;
	}
`;

const StyledButton = styled.button<{ barOpened: boolean }>`
	line-height: 2;
	text-align: center;
	margin: 0 auto;
	pointer-events: ${props => (props.barOpened ? 'auto' : 'none')};
	cursor: ${props => (props.barOpened ? 'pointer' : 'none')};
	background-color: transparent;
	border: none;
	outline: none;
	margin-left: -5px;
	color: ${props => props.theme.fg};

	@media (min-width: 700px) {
		margin-left: 0;
	}
`;

export default SearchBar;
