import React from 'react';
import AppNavigation from './screens/Navigation';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ThemeProvider } from './theme/themeContext';

const store = configureStore();

const App = () => (
	<Provider store={store}>
		<ThemeProvider>
			<AppNavigation />
		</ThemeProvider>
	</Provider>
);

export default App;