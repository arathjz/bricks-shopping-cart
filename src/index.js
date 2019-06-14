import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import ProviderContext from 'provider/provider';
import theme from './theme';
import App from './App';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<ProviderContext>
			<App />
		</ProviderContext>
	</ThemeProvider>,
	document.getElementById('root')
);
