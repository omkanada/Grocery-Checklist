const { ObjectId } = require('mongoose').Types;
const Model = require('../models/productModel');

module.exports.save = (data) => new Model(data).save();

module.exports.getProducts = async (userId) => {
    try {
        const ProductData = await Model.aggregate([{
            $match: {
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: 'categories',
                let: { categoryId: '$categoryId' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$_id', '$$categoryId'],
                        },
                    },
                },],
                as: 'categoryData',
            },
        },
        {
            $unwind: '$categoryData',
        },
        {
            $lookup: {
                from: 'contents',
                let: { productId: '$_id' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$productId', '$$productId'],
                        },
                    },
                },],
                as: 'contentData',
            },
        },
        {
            $unwind: '$contentData',
        },
        {
            $lookup: {
                from: 'checklists',
                let: { userId, productId: '$_id' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$userId', '$$userId'],
                            $eq: ['$productId', '$$productId'],
                        },
                    },
                },],
                as: 'isFav',
            },
        },
        {
            $addFields: {
                quantity: { $toInt: "$quantity" },
            },
        },
        {
            $project: {
                categoryId: 0,
            }
        },
        ]);
        return ProductData;
    } catch (error) {
        throw error;
    }
};

module.exports.getProduct = async (productId) => {
    try {
        const ProductData = await Model.aggregate([{
            $match: {
                _id: ObjectId(productId),
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: 'categories',
                let: { categoryId: '$categoryId' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$_id', '$$categoryId'],
                        },
                    },
                },],
                as: 'categoryData',
            },
        },
        {
            $unwind: '$categoryData',
        },
        {
            $lookup: {
                from: 'contents',
                let: { productId: '$_id' },
                pipeline: [{
                    $match: {
                        $expr: {
                            $eq: ['$productId', '$$productId'],
                        },
                    },
                },],
                as: 'contentData',
            },
        },
        {
            $unwind: '$contentData',
        },
        {
            $project: {
                categoryIds: 0,
            }
        },
        ]);
        return ProductData;
    } catch (error) {
        throw error;
    }
};

module.exports.remove = async (productId) => {
    try {
        const productData = await Model.remove({ _id: productId })
        return productData;
    } catch (error) {
        throw error;
    }
};