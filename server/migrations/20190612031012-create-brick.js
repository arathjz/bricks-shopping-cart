'use strict';
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
				allowNull: false,
				type: Sequelize.INTEGER
			}
		});

		await queryInterface.addConstraint('Bricks', ['propertyId'], {
			type: 'foreign key',
			name: 'brickProperty',
			references: {
				table: 'Properties',
				field: 'id'
			},
			onDelete: 'cascade',
			onUpdate: 'no action'
		});

		return queryInterface.addConstraint('Bricks', ['ownerId'], {
			type: 'foreign key',
			name: 'brickUser',
			references: {
				table: 'Users',
				field: 'id'
			},
			onDelete: 'cascade',
			onUpdate: 'no action'
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint('Bricks', 'brickProperty');
		await queryInterface.removeConstraint('Bricks', 'brickUser');
		return queryInterface.dropTable('Bricks');
	}
};
