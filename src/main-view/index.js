import React, { Component } from 'react';
import Navbar from 'components/navbar';
import Typography from 'components/typography';
import {
	Container,
	SectionTitle,
	ShoppingCartIcon,
	SelectFilter,
	Row
} from './elements';
import RoundShoppingCart from 'react-md-icon/dist/RoundShoppingCart';
import withProvider from 'provider';
import ShoppingCart from './components/shopping-cart';
import BrickList from './components/brick-list';

class MainView extends Component {
	state = {
		showModal: false,
		slide: 1
	};

	toggleModal = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};

	changeSlide = slide => this.setState({ slide });

	handleFilterChange = e => {
		const {
			getBricksAvailable,
			getBricksByProperty,
			getBricksByUser
		} = this.props;
		const { target: { value, id } } = e;
		switch (id) {
			case 'property':
				if (value.length === 0) getBricksAvailable();
				else getBricksByProperty(Number(value));
				break;
			case 'filters':
				if (value === 'available') getBricksAvailable();
				else getBricksByUser(Number(value));
				break;
			default:
				return;
		}
	};

	render() {
		const { showModal } = this.state;
		const {
			bricks,
			properties,
			addToCart,
			removeFromCart,
			clearCart,
			completePurchase,
			shoppingCart,
			getBricksUserShoppingCart,
			user
		} = this.props;
		return (
			<Container>
				<Navbar />
				<SectionTitle>
					<Typography variant="heading4">Bricks available</Typography>
					<Row>
						<Typography variant="heading" marginR="10">
							By Property
						</Typography>
						<SelectFilter onChange={this.handleFilterChange} id="property">
							<option value="">All properties</option>
							{properties &&
								properties.map(property => (
									<option key={property.id} value={property.id}>
										{property.name}
									</option>
								))}
						</SelectFilter>
						<Typography variant="heading" marginR="10">
							Filters
						</Typography>
						<SelectFilter onChange={this.handleFilterChange} id="filters">
							<option value="available">Bricks Available</option>
							<option value={`${user.id}`}>My Bricks</option>
						</SelectFilter>
						<ShoppingCartIcon
							onClick={() => {
								this.toggleModal();
								getBricksUserShoppingCart();
							}}
						>
							<RoundShoppingCart />
						</ShoppingCartIcon>
					</Row>
				</SectionTitle>
				<BrickList user={user} bricks={bricks} addToCart={addToCart} />
				<ShoppingCart
					shoppingCart={shoppingCart}
					removeFromCart={removeFromCart}
					clearCart={clearCart}
					completePurchase={completePurchase}
					showModal={showModal}
					toggleModal={this.toggleModal}
				/>
			</Container>
		);
	}
}

export default withProvider(MainView);
