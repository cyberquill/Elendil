const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function(req, res, next) {
    const data = req.body;
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.role = !isEmpty(data.role) ? data.role : '';

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 characters!';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 to 30 characters!';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match!';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required!';
    }

    if (!validator.isIn(data.gender, ['M', 'F', 'O'])) {
        errors.gender = 'Please specify a valid gender!';
    }

    if (validator.isEmpty(data.gender)) {
        errors.gender = 'Please select a Gender!';
    }

    if (!validator.isIn(data.role, ['Student', 'Instructor'])) {
        errors.role = 'Please specify a valid role!';
    }

    if (validator.isEmpty(data.role)) {
        errors.role = 'Please select a role!';
    }

    if (!isEmpty(errors)) return res.status(400).json(errors);

    next();
};
