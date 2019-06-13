const userQueries = (app, db) => ({
	getUsers: app.get('/api/users', async (_, res) =>
		db.User.findAll().then(data => {
			res.json({ data });
			res.status(200);
		})
	)
});

export default userQueries;
