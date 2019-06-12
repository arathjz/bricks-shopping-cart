import user from './user';
import property from './property';
import brick from './brick';

const queries = (app, db) => ({
	user: user(app, db),
	property: property(app, db),
	brick: brick(app, db)
});

export default queries;
