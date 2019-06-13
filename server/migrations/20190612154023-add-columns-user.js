module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Users', 'hadShoppingCart', {
			type: Sequelize.BOOLEAN
		});
		return queryInterface.addColumn('Users', 'shoppingCartDate', {
			type: Sequelize.DATE
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Users', 'hadShoppingCart');
		return queryInterface.removeColumn('Users', 'shoppingCartDate');
	}
};
