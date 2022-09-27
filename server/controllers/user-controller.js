const userService = require('../services/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email, password);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login( email, password);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async deleteUsers(req, res, next) {
    try {
      const ids = req.body.map(user => user.id);

      const users = await userService.deleteUsers(ids);

      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async blockUsers(req, res, next) {
    try {
      const ids = req.body.map(user => user.id);

      await userService.blockUsers(ids);

      return res.json({ message: 'successfully' })
    } catch (err) {
      next(err);
    }
  }

  async unblockUsers(req, res, next) {
    try {
      const ids = req.body.map(user => user.id);

      await userService.unblockUsers(ids);

      return res.json({ message: 'successfully' })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();