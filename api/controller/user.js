
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
    handleResponse,
    handleError,
} = require('../middlewares/requestHandlers');

const {
    save,
    get,
    update,
    getUserProfileData,
} = require('../dbServices/user');

const {
    requiredFeilds,
    passChk,
    chkUserExist,
    phoneNoRequired,
    emailRequired,
} = require('../messages/error');

const generateJwtToken = async (user) => {
    const token = await jwt.sign(user._doc || user, process.env.APP_SECRET, {});
    return token;
};

module.exports.register = async ({ body }, res) => {
    try {
        const { phone, email } = body;

        const existingUserPhone = await get(phone, 'phone');
        if (existingUserPhone) {
            return handleError({ res, msg: phoneNoRequired });
        }

        const existingUserEmail = await get(email, 'email');
        if (existingUserEmail) {
            return handleError({ res, msg: emailRequired });
        }

        user = await save(body);

        delete user.password;
        const newToken = await generateJwtToken(user);
        user = await update(user._id, {
            token: newToken,
        });
        return handleResponse({ res, data: user });
    } catch (err) {
        console.log('err:::::::::::', err)
        return handleError({ res, err });
    }
};

module.exports.login = async ({
    body: {
        email,
        phone,
        password,
    },
},
    res,
) => {
    try {
        if ((!phone && !email) || !password) return handleResponse({ res, msg: requiredFeilds });
        const bodyString = phone !== undefined ? 'phone' : 'email';
        const body = phone !== undefined ? phone : email;
        let user = await get(body, bodyString);
        const msgString = phone !== undefined ? 'Phone number' : 'Email';
        if (!user) {
            return handleError({ res, msg: `${msgString} entered is incorrect` });;
        }
        if (!(await user.verifyPassword(password))) {
            return handleError({ res, data: user }); passChk;
        }
        delete user._doc.password;
        const withoutToken = { ...user._doc };
        delete withoutToken.token;
        user = await getUserProfileData(user._id);
        if (user.isDeleted) return handleError({ res, msg: chkUserExist });
        const newToken = await generateJwtToken(withoutToken);
        user = await update(user._id, { token: newToken });
        handleResponse({ res, data: user });
    } catch (err) {
        handleError({ res, err });
    }
};
