const propertiesData = require('../fake-data/properties.json');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Properties', propertiesData, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Properties', null, {});
	}
};
