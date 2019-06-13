const propertyQueries = (app, db) => ({
	getProperties: app.get(
		'/api/properties',
		async (_, res) =>
			await db.Property.findAll({}).then(data => res.json({ data }))
	)
});

export default propertyQueries;
