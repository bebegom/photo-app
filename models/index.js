// Setting up the database connection
const knex = require('knex')({
	debug: true,
	client: 'mysql',
	connection: process.env.CLEARDB_DATABASE_URL || {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		charset: process.env.DB_CHARSET || 'utf8mb4',
		database: process.env.DB_NAME || 'photo_app',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || '',
	}
});

const bookshelf = require('bookshelf')(knex);

const models = {};
models.users = require('./users')(bookshelf);
models.photos = require('./photos')(bookshelf);
models.albums = require('./albums')(bookshelf);
models.albumsPhotos = require('./albums-photos')(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
