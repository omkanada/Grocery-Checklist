const Model = require('../models/contentModel');

module.exports.save = (data) => new Model(data).save();

module.exports.getById = async (productId) => {
    try {
        const contentData = await Model.aggregate([
            {
                $match: {
                    isDeleted: false,
                    productId,
                },
            },
        ]);
        return contentData;
    } catch (error) {
        throw error;
    }
};

module.exports.remove = async (productId) => {
    try {
        const contentData = await Model.remove({ productId })
        return contentData;
    } catch (error) {
        throw error;
    }
};