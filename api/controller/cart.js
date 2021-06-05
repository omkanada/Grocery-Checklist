const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    noCart,
} = require('../messages/error');

const {
    saveToCart,
    saveToCartProduct,
    getUsersCartData,
    updateCart,
    getCartProductData,
    updateCartProduct,
    removeCartProduct,
    removeCart,
    getAllCartProductData,
} = require('../dbServices/cart');

// add product to cart
module.exports.addProductToCart = async ({ body, user: { _id: userId } }, res) => {
    try {
        let cartProduct;
        let { netAmount, quantity, productId } = body;

        const cartData = await getUsersCartData(userId);
        if (cartData !== undefined) {
            const totalQuantity = parseFloat(cartData.totalQuantity) + parseFloat(quantity);
            const totalNetAmount = parseFloat(cartData.netAmount) + parseFloat(netAmount);
            await updateCart(String(userId), { totalQuantity, netAmount: totalNetAmount });

            const cartProductData = await getCartProductData(cartData._id, productId);
            if (cartProductData !== undefined) {
                quantity = parseFloat(cartProductData.quantity) + parseFloat(quantity);
                netAmount = parseFloat(cartProductData.netAmount) + parseFloat(netAmount);
                cartProduct = await updateCartProduct(String(cartProductData._id), { quantity, netAmount });
            } else {
                body.cartId = cartData._id;
                cartProduct = await saveToCartProduct(body);
            }
        } else {
            const cartObj = {
                totalQuantity: quantity,
                netAmount,
                userId,
            }
            const cart = await saveToCart(cartObj);
            body.cartId = cart._id;
            cartProduct = await saveToCartProduct(body);
        }
        return handleResponse({ res, data: cartProduct });
    } catch (err) {
        return handleError({ res, err });
    }
};

// remove product from cart
module.exports.removeProductFromCart = async ({ body, user: { _id: userId } }, res) => {
    try {
        let cartProduct;
        let { netAmount, quantity, productId } = body;

        const cartData = await getUsersCartData(userId);
        const totalQuantity = parseFloat(cartData.totalQuantity) - parseFloat(quantity);
        const totalNetAmount = parseFloat(cartData.netAmount) - parseFloat(netAmount);
        if (String(totalQuantity) > 0) {
            cartProduct = await updateCart(String(userId), { totalQuantity, netAmount: totalNetAmount });
        } else {
            cartProduct = await removeCart(String(userId));
        }

        const cartProductData = await getCartProductData(cartData._id, productId);
        quantity = parseFloat(cartProductData.quantity) - parseFloat(quantity);
        netAmount = parseFloat(cartProductData.netAmount) - parseFloat(netAmount);
        if (String(quantity) > 0) {
            cartProduct = await updateCartProduct(String(cartProductData._id), { quantity, netAmount });
        } else {
            cartProduct = await removeCartProduct(String(cartProductData._id));
        }
        return handleResponse({ res, data: cartProduct });
    } catch (err) {
        return handleError({ res, err });
    }
};

// get users cart details
module.exports.getCartProducts = async ({ user: { _id: userId } }, res) => {
    try {
        let cartProductData = {};
        let resMsg;
        const cartData = await getUsersCartData(userId);
        if (cartData !== undefined) {
            cartProductData = await getAllCartProductData(cartData._id,);
        } else {
            resMsg = noCart;
        }
        return handleResponse({ res, msg: resMsg, data: cartProductData });
    } catch (err) {
        return handleError({ res, err });
    }
};
