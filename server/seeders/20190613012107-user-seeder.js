const dataUsers = require('../fake-data/users.json');

module.exports = {
	up: queryInterface => {
		return queryInterface.bulkInsert('Users', dataUsers, {});
	},

	down: queryInterface => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
