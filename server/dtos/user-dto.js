module.exports = class UserDto {
  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.registrationDate = model.registrationDate;
    this.lastLoginDate = model.lastLoginDate;
    this.isBlocked = model.isBlocked;
  }
};