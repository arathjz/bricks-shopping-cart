module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Bricks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			price: {
				type: Sequelize.FLOAT
			},
			inShoppingCart: {
				type: Sequelize.BOOLEAN
			},
			buyedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal(
					'CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'
				)
			},
			propertyId: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			ownerId: {
				allowNull: true,
				type: Sequelize.INTEGER
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint('Bricks', 'brickProperty');
		await queryInterface.removeConstraint('Bricks', 'brickUser');
		return queryInterface.dropTable('Bricks');
	}
};
