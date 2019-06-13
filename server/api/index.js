import queries from './queries';
import actions from './actions';

const api = (app, db) => ({
	queries: queries(app, db),
	actions: actions(app, db)
});

export default api;
