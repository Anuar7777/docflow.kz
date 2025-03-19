class UserDto {
  constructor(model) {
    this.user_id = model.user_id;
    this.email = model.email;
    this.role = model.role;
    this.status = model.status;
  }
}

module.exports = UserDto;
