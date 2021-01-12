import React from 'react';
import AppNavigation from './screens/Navigation';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

const App = () => (
	<Provider store={store}>
		<AppNavigation />
	</Provider>
);

export default App;