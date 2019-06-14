import React from 'react';
import { ProviderContext } from './provider';

function withProvider(Component) {
	return function WrapperComponent(props) {
		return (
			<ProviderContext.Consumer>
				{state => {
					return <Component {...props} {...state} />;
				}}
			</ProviderContext.Consumer>
		);
	};
}

export default withProvider;
