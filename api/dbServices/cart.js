const { ObjectId } = require('mongoose').Types;
const Model = require('../models/cartModel');
const cartProductModel = require('../models/cartProductModel');

module.exports.saveToCart = (data) => new Model(data).save();

module.exports.saveToCartProduct = (data) => new cartProductModel(data).save();

module.exports.getUsersCartData = async (userId) => {
    try {
        const cartData = await Model.aggregate([
            {
                $match: {
                    userId: ObjectId(userId),
                },
            },
        ]);
        return cartData[0];
    } catch (error) {
        throw error;
    }
};

module.exports.updateCart = async (
    userId,
    {
        totalQuantity,
        netAmount,
    },
) => {
    try {

        await Model.findOneAndUpdate(
            userId,
            {
                $set: {
                    ...(totalQuantity && {
                        totalQuantity,
                    }),
                    ...(netAmount && {
                        netAmount,
                    }),
                },
            },
            {
                runValidators: true,
                new: true,
            },
        );
        const data = await this.getUsersCartData(userId);
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports.getCartProductData = async (cartId, productId) => {
    try {
        const cartProductData = await cartProductModel.aggregate([
            {
                $match: {
                    cartId: ObjectId(cartId),
                    productId: ObjectId(productId),
                },
            },
        ]);
        return cartProductData[0];
    } catch (error) {
        throw error;
    }
};

module.exports.getCartProduct = async (_id) => {
    try {
        const cartProductData = await cartProductModel.aggregate([
            {
                $match: {
                    _id: ObjectId(_id),
                },
            },
        ]);
        return cartProductData[0];
    } catch (error) {
        throw error;
    }
};

module.exports.updateCartProduct = async (
    cartProductId,
    {
        quantity,
        netAmount,
    },
) => {
    try {

        await cartProductModel.findOneAndUpdate(
            cartProductId,
            {
                $set: {
                    ...(quantity && {
                        quantity,
                    }),
                    ...(netAmount && {
                        netAmount,
                    }),
                },
            },
            {
                runValidators: true,
                new: true,
            },
        );
        const data = await this.getCartProduct(cartProductId);
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports.removeCartProduct = async (cartProductId) => {
    try {
        const data = await cartProductModel.findOneAndDelete({
            _id: cartProductId,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports.removeCart = async (userId) => {
    try {
        const data = await Model.findOneAndDelete({
            userId,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports.getAllCartProductData = async (cartId) => {
    try {
        const cartProductData = await cartProductModel.aggregate([
            {
                $match: {
                    cartId: ObjectId(cartId),
                },
            },
            {
                $lookup: {
                    from: 'products',
                    let: { productId: '$productId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$_id', '$$productId'],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: 'categories',
                                let: { categoryId: '$categoryId' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$_id', '$$categoryId'],
                                            },
                                        },
                                    },
                                ],
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
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ['$productId', '$$productId'],
                                            },
                                        },
                                    },
                                ],
                                as: 'contentData',
                            },
                        },
                        {
                            $unwind: '$contentData',
                        },
                        {
                            $project: {
                                categoryId: 0,
                            }
                        },
                    ],
                    as: 'productData',
                },
            },
            {
                $unwind: '$productData',
            },
            {
                $project: {
                    productId: 0,
                }
            },
        ]);
        return cartProductData;
    } catch (error) {
        throw error;
    }
};