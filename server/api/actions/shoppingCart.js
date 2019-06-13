const shoppingCartActions = (app, db) => ({
	addToCart: app.put('/api/shoppingCart/add', async (req, res) => {
		try {
			const body = req.body;
			// Check in required params are in body
			if (!body.userId || !body.brickId) {
				return res.json({
					error: 'Missing Params'
				});
			}
			const userId = Number(body.userId);
			const brickId = Number(body.brickId);

			// Check if body params are valid
			if (isNaN(userId) || isNaN(brickId)) {
				return res.json({
					error: 'Invalid Params'
				});
			}

			// Check if brick is available
			const brick = await db.Brick.findOne({
				where: { id: brickId }
			});

			if (brick.ownerId) {
				res.json({
					error: 'Brick already has owner'
				});
				return;
			}

			// Update fields
			const results = await Promise.all([
				db.Brick.update(
					{
						ownerId: userId,
						inShoppingCart: true,
						shoppingCartDate: Date.now()
					},
					{
						where: { id: brickId }
					}
				),
				db.User.update(
					{
						hasShoppingCart: true
					},
					{
						where: { id: userId }
					}
				)
			]);

			if (results) {
				res.json({
					status: 'success'
				});
				res.status(200);
				return;
			}
		} catch (err) {
			res.json({
				error: 'Something went wrong'
			});
		}
	}),
	removeFromCart: app.put('/api/shoppingCart/remove', async (req, res) => {
		try {
			const body = req.body;
			// Check in required params are in body
			if (!body.userId || !body.brickId) {
				return res.json({
					error: 'Missing Params'
				});
			}
			const userId = Number(body.userId);
			const brickId = Number(body.brickId);

			// Check if body params are valid
			if (isNaN(userId) || isNaN(brickId)) {
				return res.json({
					error: 'Invalid Params'
				});
			}

			// Update fields
			await db.Brick.update(
				{
					ownerId: null,
					inShoppingCart: false,
					shoppingCartDate: null
				},
				{
					where: { id: brickId }
				}
			);

			// Check if user still has bricks in shoppingCart
			const bricksOfUser = await db.Brick.findAll({
				where: { ownerId: userId, inShoppingCart: true }
			});

			// If user bricks are 0 then userShoppingCar is set to false
			if (bricksOfUser.length === 0) {
				await db.User.update(
					{
						hasShoppingCart: false
					},
					{
						where: { id: userId }
					}
				);
			}

			res.json({
				status: 'success'
			});
			res.status(200);
			return;
		} catch (err) {
			res.json({
				error: 'Something went wrong'
			});
		}
	}),
	clearCart: app.put('/api/shoppingCart/clear', async (req, res) => {
		try {
			const body = req.body;
			// Check in required params are in body
			if (!body.userId) {
				return res.json({
					error: 'Missing Params'
				});
			}
			const userId = Number(body.userId);

			// Check if body params are valid
			if (isNaN(userId)) {
				return res.json({
					error: 'Invalid Params'
				});
			}

			// Set fields to default values
			await Promise.all([
				db.Brick.update(
					{
						ownerId: null,
						inShoppingCart: false,
						shoppingCartDate: null
					},
					{
						where: { ownerId: userId, inShoppingCart: true }
					}
				),
				db.User.update(
					{
						hasShoppingCart: false
					},
					{
						where: { id: userId }
					}
				)
			]);
			res.json({
				status: 'success'
			});
			res.status(200);
			return;
		} catch (err) {
			res.json({
				error: 'Something went wrong'
			});
		}
	}),
	completePurchase: app.put('/api/shoppingCart/complete', async (req, res) => {
		try {
			const body = req.body;
			// Check in required params are in body
			if (!body.userId) {
				return res.json({
					error: 'Missing Params'
				});
			}
			const userId = Number(body.userId);

			// Check if body params are valid
			if (isNaN(userId)) {
				return res.json({
					error: 'Invalid Params'
				});
			}

			// Complete purchase
			await Promise.all([
				db.Brick.update(
					{
						inShoppingCart: false,
						buyedAt: Date.now(),
						shoppingCartDate: null
					},
					{
						where: { ownerId: userId, inShoppingCart: true }
					}
				),
				db.User.update(
					{
						hasShoppingCart: false
					},
					{
						where: { id: userId }
					}
				)
			]);
			res.json({
				status: 'success'
			});
			res.status(200);
			return;
		} catch (err) {
			res.json({
				error: 'Something went wrong'
			});
		}
	})
});

export default shoppingCartActions;
