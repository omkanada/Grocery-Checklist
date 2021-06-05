
const Model = require('../models/userModel');
const { ObjectId } = require('mongoose').Types;

module.exports.save = (data) => new Model(data).save();

module.exports.get = async (idOrEmail, fieldName = '_id') => {
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
    isDeleted: false,
  });
  return data;
};

module.exports.update = async (
  userId,
  {
    name,
    password,
    email,
    phone,
    token,
  },
) => {
  try {

    await Model.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && {
            name,
          }),
          ...(email && {
            email,
          }),
          ...(password && {
            password,
          }),
          ...(phone && {
            phone,
          }),
          ...(token && {
            token,
          }),
        },
      },
      {
        runValidators: true,
        new: true,
        projection: {
          password: 0,
        },
      },
    );
    const data = await this.getUserProfileData(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports.getUserProfileData = async (userId) => {
  try {
    const userData = await Model.aggregate([
      {
        $match: {
          _id: ObjectId(userId),
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    return userData[0];
  } catch (error) {
    throw error;
  }
};