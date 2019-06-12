const propertyQueries = (app, db) => ({
	getProperties: app.get('/api/properties', (_, res) =>
		db.Property.findAll().then(data => res.json({ data }))
	)
});

export default propertyQueries;
