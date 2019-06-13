const propertyQueries = (app, db) => ({
	getProperties: app.get('/api/properties', (_, res) =>
		db.Property.findAll({}).then(data => {
			res.json({ data });
			res.status(200);
		})
	)
});

export default propertyQueries;
