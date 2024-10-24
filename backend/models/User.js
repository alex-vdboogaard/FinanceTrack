class User {
  constructor(
    username,
    password,
    firstName,
    lastName = null,
    dateJoined = new Date()
  ) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateJoined = dateJoined;
  }
}

module.exports = User;
