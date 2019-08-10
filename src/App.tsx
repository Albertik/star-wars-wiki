import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { HomePage, DetailsPage } from './pages';
import Header from './components/Header';
import { Footer } from './components/Footer';
import сharactersStore from './stores/CharactersStore';

// Define our `fg` and `bg` on the theme
const theme = {
	fg: 'rgb(255, 232, 31)',
	bg: '#000'
};

const App: React.FC = () => {
	return (
		<Provider charactersStore={сharactersStore}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/details/:id" component={DetailsPage} />
					</Switch>
					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
