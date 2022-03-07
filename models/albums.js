/** ALBUM MODEL **/

module.exports = (bookshelf) => {
	return bookshelf.model('album', {
		tableName: 'albums',
		user() {
			return this.belongsTo('user');
		},
		photos() {
			return this.belongsToMany('photo');
		}
	});
};
