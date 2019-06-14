import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import confirmation from 'components/confirmation';
import withProvider from 'provider';
export const ProviderContext = React.createContext(null);

class Provider extends Component {
	state = {
		apiUrl: 'http://localhost:8080/api',
		user: {},
		properties: [],
		bricks: [],
		shoppingCart: []
	};

	// Life Cycles
	componentDidMount = async () => {
		Promise.all([
			this.getBricksAvailable(),
			this.getUsers(),
			this.getProperties()
		]);
	};

	getUsers = async () => {
		const { apiUrl } = this.state;
		const response = await axios.get(`${apiUrl}/users`);
		const { data: { data: users } } = response;
		this.setState({ user: users[0] });
	};

	getProperties = async () => {
		const { apiUrl } = this.state;
		const response = await axios.get(`${apiUrl}/properties`);
		const { data: { data: properties } } = response;
		this.setState({ properties });
	};

	getBricksAvailable = async () => {
		const { apiUrl } = this.state;
		const response = await axios.get(`${apiUrl}/bricks/{"available": true}`);
		const { data: { data: bricks } } = response;
		this.setState({ bricks });
	};

	getBricksByProperty = async propertyId => {
		const { apiUrl } = this.state;
		const response = await axios.get(
			`${apiUrl}/bricks/{"propertyId": ${propertyId}}`
		);
		const { data: { data: bricks } } = response;
		this.setState({ bricks });
	};

	getBricksByUser = async ownerId => {
		const { apiUrl } = this.state;
		const response = await axios.get(
			`${apiUrl}/bricks/{"ownerId": ${ownerId}}`
		);
		const { data: { data: bricks } } = response;
		this.setState({ bricks });
	};

	getBricksUserShoppingCart = async () => {
		const { apiUrl, user } = this.state;
		const response = await axios.get(
			`${apiUrl}/bricks/{"ownerId": ${user.id}, "inShoppingCart": true}`
		);
		const { data: { data: shoppingCart } } = response;
		this.setState({ shoppingCart: shoppingCart || [] });
	};

	addToCart = async brickId => {
		const { user, apiUrl } = this.state;
		axios
			.put(`${apiUrl}/shoppingCart/add`, {
				userId: user.id,
				brickId
			})
			.then(() => {
				this.getBricksAvailable();
				toast.success(`Brick ${brickId} added to cart`);
			})
			.catch(err => {
				toast.error(err);
			});
	};

	removeFromCart = async brickId => {
		const { user, apiUrl } = this.state;
		if (await confirmation('Are you sure?')) {
			axios
				.put(`${apiUrl}/shoppingCart/remove`, {
					userId: user.id,
					brickId
				})
				.then(() => {
					this.getBricksAvailable();
					this.getBricksUserShoppingCart();
					toast.success(`Brick ${brickId} removed from cart`);
				})
				.catch(err => {
					toast.error(err);
				});
		}
	};

	clearCart = async () => {
		const { user, apiUrl } = this.state;
		if (await confirmation('Are you sure?')) {
			axios
				.put(`${apiUrl}/shoppingCart/clear`, {
					userId: user.id
				})
				.then(() => {
					this.getBricksAvailable();
					toast.success(`Shopping cart cleared`);
				})
				.catch(err => {
					toast.error(err);
				});
		}
	};

	completePurchase = async () => {
		const { user, apiUrl } = this.state;
		if (
			await confirmation(
				'Are you sure?',
				'By completing the purchase you are agree with out terms and conditions of service'
			)
		) {
			axios
				.put(`${apiUrl}/shoppingCart/complete`, {
					userId: user.id
				})
				.then(() => {
					this.getBricksAvailable();
					toast.success(`Purchase completed`);
				})
				.catch(err => {
					toast.error(err);
				});
		}
	};

	render() {
		const { children } = this.props;
		const { apiUrl, user, bricks, shoppingCart, properties } = this.state;
		return (
			<ProviderContext.Provider
				value={{
					apiUrl,
					user,
					bricks,
					shoppingCart,
					properties,
					getBricksAvailable: this.getBricksAvailable,
					getBricksByProperty: this.getBricksByProperty,
					getBricksByUser: this.getBricksByUser,
					getBricksUserShoppingCart: this.getBricksUserShoppingCart,
					addToCart: this.addToCart,
					removeFromCart: this.removeFromCart,
					clearCart: this.clearCart,
					completePurchase: this.completePurchase
				}}
			>
				{children}
			</ProviderContext.Provider>
		);
	}
}

export default withProvider(Provider);
