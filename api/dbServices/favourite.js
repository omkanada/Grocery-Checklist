const Model = require('../models/favouriteModel');

module.exports.save = (data) => new Model(data).save();

module.exports.getById = async (userId) => {
    try {
        const favouriteData = await Model.aggregate([{
            $match: {
                isDeleted: false,
                userId,
            },
        }]);
        return favouriteData;
    } catch (error) {
        throw error;
    }
};

module.exports.remove = async (productId, userId) => {
    try {
        const favouriteData = await Model.remove({ productId, userId })
        return favouriteData;
    } catch (error) {
        throw error;
    }
};