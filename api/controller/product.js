const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    save: saveContent,
    remove: removeContent
} = require('../dbServices/content');

const {
    save,
    getProducts,
    getProduct,
    remove,
} = require('../dbServices/product');

// add product

module.exports.save = async ({ body }, res) => {
    try {
        const { content } = body;
        const product = await save(body);

        const contentData = {
            description: content,
            productId: product._id
        }

        if (product) await saveContent(contentData)

        return handleResponse({ res, data: product });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get all product
module.exports.getAllProducts = async ({ user }, res) => {
    try {
        const product = await getProducts(user._id);
        return handleResponse({ res, data: product });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get product details
module.exports.getProduct = async ({ params: { productId } }, res) => {
    try {
        const product = await getProduct(productId);
        return handleResponse({ res, data: product });
    } catch (err) {
        return handleError({ res, err });
    }
};

// remove product
module.exports.remove = async ({ params: { productId } }, res) => {
    try {
        const product = await remove(productId);
        await removeContent(productId)
        return handleResponse({ res, data: product });
    } catch (err) {
        return handleError({ res, err });
    }
};
