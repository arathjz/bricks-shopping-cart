const brickQueries = (app, db) => ({
	getBricks: app.get('/api/bricks', (_, res) =>
		db.Brick.findAll().then(data => res.json({ data }))
	)
});

export default brickQueries;
