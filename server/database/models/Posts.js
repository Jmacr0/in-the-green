module.exports = function (sequelize, DataTypes) {
	const Posts = sequelize.define("Posts", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 50]
			}
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: 'Untitled',
			validate: {
				len: [1]
			}
		}
	});
	Posts.associate = function (models) {
		Posts.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return Posts;
};

// POSSIBLE COLUMNS TO ADD:
// like count
// like username (to see who likes the post)
// comment count
// comment username (to see who commented)