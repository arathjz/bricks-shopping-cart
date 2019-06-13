module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Users', 'hasShoppingCart', {
			type: Sequelize.BOOLEAN,
			allowNull: false
		});
		return queryInterface.addColumn('Bricks', 'shoppingCartDate', {
			type: Sequelize.DATE,
			allowNull: true
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Users', 'hasShoppingCart');
		return queryInterface.removeColumn('Bricks', 'shoppingCartDate');
	}
};
