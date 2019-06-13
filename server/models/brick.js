module.exports = (sequelize, DataTypes) => {
	const Brick = sequelize.define(
		'Brick',
		{
			price: DataTypes.FLOAT,
			inShoppingCart: DataTypes.BOOLEAN,
			shoppingCartDate: DataTypes.DATE,
			buyedAt: DataTypes.DATE,
			ownerId: DataTypes.INTEGER,
			propertyId: DataTypes.INTEGER
		},
		{}
	);
	Brick.associate = function(models) {
		Brick.property = Brick.belongsTo(models.Property, {
			as: 'property',
			foreignKey: 'propertyId',
			targetKey: 'id'
		});
		Brick.owner = Brick.belongsTo(models.User, {
			as: 'owner',
			foreignKey: 'ownerId',
			targetKey: 'id'
		});
	};
	return Brick;
};
