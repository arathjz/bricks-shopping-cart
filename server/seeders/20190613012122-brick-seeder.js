const dataBricks = require('../fake-data/bricks.json');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Bricks', dataBricks, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Bricks', null, {});
	}
};
