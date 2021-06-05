const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    save,
    getById,
    remove,
} = require('../dbServices/favourite');

// add-remove product to favourites

module.exports.save = async ({ user, body }, res) => {
    try {
        let favourite;
        body.userId = user._id;
        if (body.isFav) {
            favourite = await save(body);
        } else {
            favourite = await remove(body.productId, user._id)
        }
        return handleResponse({ res, data: favourite });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get users favourite product

module.exports.getById = async ({ user }, res) => {
    try {
        const favourite = await getById(user._id);
        return handleResponse({ res, data: favourite });
    } catch (err) {
        return handleError({ res, err });
    }
};