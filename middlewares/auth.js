const debug = require('debug')('books:auth');
const models = require('../models');
const bcrypt = require('bcrypt');

const basic = async (req,res, next) => {

    // authorization header must exist, otherwise fail!
    if(!req.headers.authorization) {
        debug('Authorization header missing');

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required'
        });
    }
    debug('Authprization header %o', req.headers.authorization);
    
    //  split the schema and base64 into an array
    const [authschema, base64Payload] = req.headers.authorization.split(' ');

    // see if schema is basic
    if(authschema.toLowerCase() !== 'basic') {
        debug('Authorization schema is not basic');

        return res.status(401).send({
            status: 'fail',
            data: 'Athorization required'
        });
    }

    const decodedToAscii = Buffer.from(base64Payload, 'base64').toString('ascii');

    // split the payload to get the email and password
    const [email, password] = decodedToAscii.split(':');

    // Find user based on email, if not -> fail
    const user = await new models.users({ email }).fetch({ require: false });
    if(!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed'
        });
    }; 

    // compare the incoming password with the hashed one
    const comparedPasswords = await bcrypt.compare(password, user.get('password'));

    if(!comparedPasswords) {
        res.status(401).send({
            status: 'fail',
            data: 'Authorization failed'
        })
    };

    // attach user to request
    req.user = user;

    next();
};

module.exports = {
    basic
};