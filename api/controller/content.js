const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    save,
    getById
} = require('../dbServices/content');

// add product content

module.exports.save = async ({ body }, res) => {
    try {
        const content = await save(body);
        return handleResponse({ res, data: content });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get product content

module.exports.getById = async ({ params: productId }, res) => {
    try {
        const content = await getById(productId);
        return handleResponse({ res, data: content });
    } catch (err) {
        return handleError({ res, err });
    }
};