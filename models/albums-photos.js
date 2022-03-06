/** ALBUMS-PHOTOS MODEL **/

module.exports = (bookshelf) => {
	return bookshelf.model('albums_photos', {
		tableName: 'albums_photos',
		albums() {
			return this.hasMany('album');
		},
        photos() {
            return this.hasMany('photo');
        }
	});
};
