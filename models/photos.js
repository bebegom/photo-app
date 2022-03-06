/** PHOTOS MODEL **/

 module.exports = (bookshelf) => {
	return bookshelf.model('photo', {
		tableName: 'photos',
		users() {
			return this.belongsTo('user');
		},
		albums() {
			return this.belongsToMany('album');
		}
	});
};