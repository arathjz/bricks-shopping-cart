import shoppingCartActions from './shoppingCart';

const actions = (app, db) => ({
	shoppingCartActions: shoppingCartActions(app, db)
});

export default actions;
