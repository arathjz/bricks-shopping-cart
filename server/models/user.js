module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			hadShoppingCart: DataTypes.BOOLEAN,
			shoppingCartDate: DataTypes.DATE
		},
		{}
	);
	User.associate = function(models) {
		User.bricks = User.hasMany(models.Brick, {
			as: 'bricks',
			foreignKey: 'ownerId',
			sourceKey: 'id'
		});
	};
	return User;
};
