import React, { Fragment } from 'react';
import Typography from 'components/typography';
import { BrickCard, BuyButton } from './elements';

const BrickList = ({ user, bricks, addToCart }) => (
	<Fragment>
		{bricks &&
			bricks.map(brick => (
				<BrickCard key={brick.id}>
					<Typography variant="heading">ID ${brick.id}</Typography>
					<Typography variant="heading">Price: ${brick.price}</Typography>
					<Typography variant="heading">
						Property: {brick.property && brick.property.name}
					</Typography>
					{user.id !== brick.ownerId && (
						<BuyButton
							size="small"
							color="secondary"
							onClick={() => addToCart(brick.id)}
						>
							Add to cart
						</BuyButton>
					)}
				</BrickCard>
			))}
	</Fragment>
);

export default BrickList;
