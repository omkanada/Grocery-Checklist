const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    save,
    getAll
} = require('../dbServices/category');

// add category
module.exports.save = async({ body }, res) => {
    try {
        const category = await save(body);
        return handleResponse({ res, data: category });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get category
module.exports.getAll = async(req, res) => {
    try {
        const category = await getAll();
        return handleResponse({ res, data: category });
    } catch (err) {
        return handleError({ res, err });
    }
};