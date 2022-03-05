 /** USERS MODEL **/
 
 module.exports = (bookshelf) => {
	return bookshelf.model('user', {
		tableName: 'users',
		photos() {
            return this.hasMany('photo');
        },
		albums() {
			return this.hasMany('album');
		}
		
	});
};
