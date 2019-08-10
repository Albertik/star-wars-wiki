import React, { Component } from 'react';
import { CharactersStore } from '../stores/CharactersStore';
import { inject, observer } from 'mobx-react';
import List from '../components/list/List';
import ListItem from '../components/list/ListItem';
import { withRouter } from 'react-router-dom';
import { CharacterType } from '../types/index';

type Props = {
	charactersStore?: CharactersStore;
	match: any;
};

type State = {
	currentCharacter: CharacterType | null;
};

@inject('charactersStore')
@observer
class CharactersContainer extends Component<Props, State> {
	componentDidMount() {
		let { match, charactersStore } = this.props;
		let id = match.params && match.params.id;
		id ? charactersStore!.loadCharacter(id) : charactersStore!.loadCharacters();
	}

	render() {
		let { match, charactersStore } = this.props;
		let { error, isLoading, characters } = charactersStore!;
		let id = match.params && match.params.id;
		let character = charactersStore!.getCharacter(id);

		if (id && character) {
			return <ListItem loading={isLoading} error={error} isDetailed={true} item={character} />;
		} else {
			return <List loading={isLoading} error={error} items={characters} />;
		}
	}
}

export default withRouter<any, any>(CharactersContainer);
