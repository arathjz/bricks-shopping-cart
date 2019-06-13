const brickQueries = (app, db) => ({
	getBricks: app.get('/api/bricks', async (_, res) => {
		const data = await db.Brick.findAll();
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
			}
			const data = await db.Brick.findAll({
				where: filters
			});
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
		return res.json({ data });
	})
});

export default brickQueries;
