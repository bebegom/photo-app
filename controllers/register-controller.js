/** REGISTER CONTROLLER **/

const debug = require('debug')('books:register_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    // check for errors in the data the user sent in
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ 
            status: 'fail', 
            data: errors.array() 
        });
    }

    // only get the validated data from the request
    const validData = matchedData(req);

    // hash the password
    try {
        // overwrite validData.password with the hashed password
        validData.password = await bcrypt.hash(validData.password, 10);

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown when hashing the password'
        });
        throw error;
    }

    // then try to save the user
    try{
        const user = await new models.users(validData).save();
        debug('Created new user successfully: %O', user);

        res.status(200).send({ 
            status: 'success', 
            data: {
                email: validData.email,
                first_name: validData.first_name,
                last_name: validData.last_name,
            } 
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new user.'
        });
        throw error;
    }
};

module.exports = {
    register,
};