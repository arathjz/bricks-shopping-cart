import { Op } from 'sequelize';
import moment from 'moment';

// Release bricks that has been in shoppingCart more than two days
const releaseBricks = async db =>
	await db.Brick.update(
		{
			ownerId: null,
			inShoppingCart: false,
			shoppingCartDate: null
		},
		{
			where: {
				inShoppingCart: true,
				shoppingCartDate: {
					[Op.lte]: moment().subtract(2, 'days').format()
				}
			}
		}
	);

const brickQueries = (app, db) => ({
	getBricks: app.get('/api/bricks', async (_, res) => {
		await releaseBricks(db);
		const data = await db.Brick.findAll();
		res.status(200);
		return res.json({ data });
	}),
	getBricksByFilters: app.get('/api/bricks/:data', async (req, res) => {
		try {
			let filters = {};
			if (Object.keys(req.params).length > 0) {
				const data = JSON.parse(req.params.data);
				// Filter bricks available
				if (data.available) {
					filters = { ...filters, ownerId: null, inShoppingCart: false };
				}
				// Filter bricks by property
				if (data.propertyId) {
					filters = { ...filters, propertyId: data.propertyId };
				}
				// Filter bricks by owner
				if (data.ownerId) {
					filters = { ...filters, ownerId: data.ownerId };
				}

				// Filter bricks in shoppingCart
				if (data.inShoppingCart) {
					filters = { ...filters, inShoppingCart: true };
				}
			}

			await releaseBricks(db);
			const data = await db.Brick.findAll({
				where: filters
			});
			res.status(200);
			return res.json({ data });
		} catch (err) {
			return res.json({
				error: 'Invalid params'
			});
		}
	}),
	getBrick: app.get('/api/brick/:id', async (req, res) => {
		if (isNaN(Number(req.params.id))) {
			return res.json({
				error: 'Invalid params'
			});
		}
		const data = await db.Brick.findOne({
			where: { id: Number(req.params.id) }
		});
		res.status(200);
		return res.json({ data });
	})
});

export default brickQueries;
