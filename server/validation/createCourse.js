const validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function (req, res, next) {
    const data = req.body;
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.about = !isEmpty(data.about) ? data.about : '';
    data.logo = !isEmpty(data.logo) ? data.logo : '';
    data.cover = !isEmpty(data.cover) ? data.cover : '';

    if (validator.isEmpty(data.title))
        errors.title = 'Title field is required!';
    
    if (!validator.isNumeric(data.price, { no_symbols: false}))
        errors.price = 'Please specify a valid price!';

    if (validator.isEmpty(data.price))
        errors.price = 'Price field is required!';

    if (validator.isEmpty(data.about))
        errors.about = 'About field is required!';

    if (!validator.isURL(data.logo))
        errors.logo = 'Please specify a valid Logo!';

    if (validator.isEmpty(data.logo))
        errors.logo = 'Logo field is required!';

    if (!validator.isURL(data.cover))
        errors.cover = 'Please specify a valid Cover!';

    if (validator.isEmpty(data.cover))
        errors.cover = 'Cover field is required!';

    if (!isEmpty(errors)) 
        return res.status(400).json(errors);

    next();
};
