class UserDto {
  constructor(model) {
    this.user_id = model.user_id;
    this.email = model.email;
    this.role = model.role;
    this.status = model.status;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
  }
}

module.exports = UserDto;
