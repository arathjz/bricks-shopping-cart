import React from 'react';
import SideModal from 'components/side-modal';
import Typography from 'components/typography';
import Button from 'components/button';
import { Item, Actions, RemoveIcon } from './elements';
import RoundClose from 'react-md-icon/dist/RoundClose';

const ShoppingCart = ({
	shoppingCart,
	showModal,
	toggleModal,
	removeFromCart,
	clearCart,
	completePurchase
}) => (
	<SideModal
		active={showModal}
		closeButton={toggleModal}
		title="Your shopping cart"
	>
		<Typography align="right" variant="heading6" marginB="20">
			{shoppingCart.length} items in cart
		</Typography>
		{shoppingCart.map(brick => (
			<Item key={brick.id}>
				<Typography variant="heading">ID ${brick.id}</Typography>
				<Typography variant="heading">Price: ${brick.price}</Typography>
				<Typography variant="heading">
					Property: {brick.property && brick.property.name}
				</Typography>
				<RemoveIcon onClick={() => removeFromCart(brick.id)}>
					<RoundClose />
				</RemoveIcon>
			</Item>
		))}
		{shoppingCart.length > 0 && (
			<Actions>
				<Button
					size="small"
					variant="outlined"
					color="info"
					marginR="20"
					onClick={async () => {
						await clearCart();
						toggleModal();
					}}
				>
					Clear Cart
				</Button>
				<Button
					size="small"
					color="secondary"
					onClick={async () => {
						await completePurchase();
						toggleModal();
					}}
				>
					Complete Purchase
				</Button>
			</Actions>
		)}
	</SideModal>
);

export default ShoppingCart;
