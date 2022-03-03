/** PHOTOS MODEL **/

 module.exports = (bookshelf) => {
	return bookshelf.model('photo', {
		tableName: 'photos',
		user() {
			return this.belongsTo('user');
		},
	});
};