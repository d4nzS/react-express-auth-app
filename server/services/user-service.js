const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async registration(name, email, password) {
    if (await UserModel.findOne({ email })) {
      throw ApiError.BadRequest('This email is already in use');
    }

    if (await UserModel.findOne({ name })) {
      throw ApiError.BadRequest('This name is already in use');
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      registrationDate: Date.now(),
      lastLoginDate: Date.now(),
      isBlocked: false
    });

    const userDto = new UserDto(user);

    return { user: userDto }
  }

  async login(email, password) {
    const user = await UserModel.findOneAndUpdate({ email }, { lastLoginDate: Date.now() })

    if (!user) {
      throw ApiError.BadRequest('This email is not found')
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }

    if (user.isBlocked) {
      throw ApiError.BadRequest('The user is blocked!');
    }

    const userDto = new UserDto(user);

    return { user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();

    const usersDto = users.map(user => new UserDto(user));

    return usersDto;
  }

  async deleteUsers(ids) {
    const users = ids.map(async id => await UserModel.findByIdAndRemove(id));

    const usersDto = users.map(user => new UserDto(user));

    return usersDto;
  }

  async blockUsers(ids) {
    ids.map(async id => await UserModel.findByIdAndUpdate(id, { isBlocked: true }));
  }

  async unblockUsers(ids) {
    ids.map(async id => await UserModel.findByIdAndUpdate(id, { isBlocked: false }));
  }
}

module.exports = new UserService();