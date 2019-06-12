const userQueries = (app, db) => ({
	getUsers: app.get('/api/users', (_, res) =>
		db.User.findAll().then(data => res.json({ data }))
	)
});

export default userQueries;
