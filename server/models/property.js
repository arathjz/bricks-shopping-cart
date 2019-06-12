module.exports = (sequelize, DataTypes) => {
	const Property = sequelize.define(
		'Property',
		{
			name: DataTypes.STRING
		},
		{}
	);
	Property.associate = function(models) {
		Property.bricks = Property.hasMany(models.Brick, {
			as: 'bricks',
			foreignKey: 'propertyId',
			sourceKey: 'id'
		});
	};
	return Property;
};
