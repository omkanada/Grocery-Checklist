const Model = require('../models/categoryModel');

module.exports.save = (data) => new Model(data).save();

module.exports.getAll = async() => {
    try {
        const categoryData = await Model.aggregate([{
            $match: {
                isDeleted: false,
            },
        }, ]);
        return categoryData;
    } catch (error) {
        throw error;
    }
};